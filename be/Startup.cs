using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using risk9.Data;
using Microsoft.EntityFrameworkCore;
using risk9.Swagger;

namespace risk9
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<DataContext>(options =>
                options.UseSqlite("Filename=Data.sqlite")
            );
            services.AddDatabaseDeveloperPageExceptionFilter();


            services.AddCors(c => c.AddPolicy("LocalDevelopment", builder =>
            {
                builder.WithOrigins("http://localhost:3000");
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
                builder.AllowCredentials();
            }));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "risk9", Version = "v1" });
                c.SchemaFilter<RequireNonNullablePropertiesSchemaFilter>();
                c.SupportNonNullableReferenceTypes();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "risk9 v1"));
                dataContext.Database.Migrate();

                app.UseCors("LocalDevelopment");
            } 

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
