using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using risk9.Data;
using risk9.Bindings;
using risk9.Models;
using AutoMapper;

namespace risk9.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AssetController : ControllerBase
    {
        private readonly ILogger<AssetController> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AssetController(ILogger<AssetController> logger, DataContext context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<Asset>> ListAll()
        {
            return await _context.Assets.ToListAsync();
        }

        [HttpPost]
        public async Task<Asset> Add([FromBody] AssetBinding newAsset)
        {
            var t = _mapper.Map<Asset>(newAsset);
            await _context.Assets.AddAsync(t);
            await _context.SaveChangesAsync();
            return t;
        }
        
    }
}