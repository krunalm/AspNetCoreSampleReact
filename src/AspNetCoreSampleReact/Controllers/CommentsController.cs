using System;
using System.Collections.Generic;
using System.IO;
using AspNetCoreSampleReact.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AspNetCoreSampleReact.Controllers
{
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly IHostingEnvironment _env;

        public CommentsController(IHostingEnvironment env)
        {
            _env = env;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Comment> Get()
        {
            var comments = JsonConvert.DeserializeObject<List<Comment>>(ReadCommentsJson());
            return comments;
        }

        // GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Comment comment)
        {
            var comments = JsonConvert.DeserializeObject<List<Comment>>(ReadCommentsJson());
            comments.Add(comment);
            SaveCommentsJson(JsonConvert.SerializeObject(comments));
        }

        // PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]Comment comment)
        //{
        //}

        // DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        private string ReadCommentsJson()
        {
            var dataFile = Path.Combine(_env.ContentRootPath, @"Data\comments.json");

            var json = System.IO.File.ReadAllText(dataFile);

            return json;
        }

        private void SaveCommentsJson(string json)
        {
            var dataFile = Path.Combine(_env.ContentRootPath, @"Data\comments.json");

            System.IO.File.WriteAllText(dataFile, json);
        }
    }
}
