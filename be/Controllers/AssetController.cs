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
        [ProducesResponseType(typeof(List<Asset>), 200)]
        public async Task<IActionResult> ListAll()
        {
            return Ok(await _context.Assets.ToListAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Asset), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAsset(int id)
        {
            Asset? asset = await _context.Assets.FirstOrDefaultAsync(x => x.AssetId == id);
            
            if (asset == null) 
            {
                return NotFound();
            }

            return Ok(asset);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Asset), 201)]
        public async Task<IActionResult> Add([FromBody] AssetBinding newAsset)
        {
            Asset asset = _mapper.Map<Asset>(newAsset);
            await _context.Assets.AddAsync(asset);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAsset), new { id = asset.AssetId }, asset);
        }

        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(typeof(Asset), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(int id, [FromBody] AssetBinding update)
        {
            Asset? asset = await _context.Assets.FirstOrDefaultAsync(x => x.AssetId == id);
            if (asset != null) {
                _mapper.Map<AssetBinding, Asset>(update, asset);
                _context.Assets.Update(asset);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Remove(int id)
        {
            Asset? asset = await _context.Assets.FirstOrDefaultAsync(x => x.AssetId == id);
            if (asset != null) {
                _context.Assets.Remove(asset);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}