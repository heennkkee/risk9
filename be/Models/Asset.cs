using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using risk9.Bindings;

namespace risk9.Models {

    [Table("Assets")]
    public class Asset : AssetBinding
    {
        public Asset(string description) : base(description)
        {
        }
        [BindNever]
        public int AssetId { get; set; }
    }
}