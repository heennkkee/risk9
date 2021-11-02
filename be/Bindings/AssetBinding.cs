using System.ComponentModel.DataAnnotations;

namespace risk9.Bindings
{
    public class AssetBinding
    {
        public string Description { get; set; }
        public string? Description2 { get; set; }
        [Required]
        public int? NumberThing { get; set; }

        public AssetBinding(string description)
        {
            Description = description;
        }
    }
}