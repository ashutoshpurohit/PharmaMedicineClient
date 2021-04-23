using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace PharmaMedicineClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController: ControllerBase
    {
        private readonly HttpClient _httpClient;

        private readonly ILogger<MedicineController> _logger;

        public MedicineController(HttpClient httpClient, ILogger<MedicineController> logger)
        {
            this._httpClient = httpClient;
            this._logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Medicine>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicines()
        {
            /*Ideally we should have used the API Gteway created Upstream url but we have to 
             enable conainer support to run and verify so directly used.*/
            //Ashutosh - we should have used /PharmaMedicine  as upstream uri as defined in Oclet API Gatweay project
            var medicines = await _httpClient.GetFromJsonAsync<IEnumerable<Medicine>>("/api/v1/PharmaMedicine");
            return Ok(medicines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Medicine>> Get(string id)
        {
            try
            {
                /*Ideally we should have used the API Gteway created Upstream url but we have to 
             enable conainer support to run and verify so directly used.*/
                var get_uri = string.Format("api/v1/PharmaMedicine/GetMedicineById/{0}", id);
                var medicines = await _httpClient.GetFromJsonAsync<Medicine>(get_uri);
                return Ok(medicines);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("[action]/{name}")]
        public async Task<ActionResult<IEnumerable<Medicine>>> Search(string name)
        {
            try
            {
                /*Ideally we should have used the API Gteway created Upstream url but we have to 
             enable conainer support to run and verify so directly used.*/
                var search_uri = string.Format("api/v1/PharmaMedicine/GetMedicineByName/{0}", name);
                var medicines = await _httpClient.GetFromJsonAsync<Medicine>(search_uri);
                return Ok(medicines);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("[action]/{brand}")]
        public async Task<ActionResult<IEnumerable<Medicine>>> SearchByBrand(string brand)
        {
            try
            {
                /*Ideally we should have used the API Gteway created Upstream url but we have to 
             enable conainer support to run and verify so directly used.*/
                var search_by_brand_uri = string.Format("api/v1/PharmaMedicine/GetMedicineByBrand/{0}", brand);
                var medicines = await _httpClient.GetFromJsonAsync<Medicine>(search_by_brand_uri);
                return Ok(medicines);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(Medicine), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Medicine>> CreateMedicine([FromBody] Medicine medicine)
        {
            if(medicine.Expiry <= DateTime.Now.AddDays(15))
            {
                return StatusCode(StatusCodes.Status400BadRequest, "You cannot add a medicne with less than 15 days expiry period in the stock");
            }

            try
            {
                /*Ideally we should have used the API Gteway created Upstream url but we have to 
             enable conainer support to run and verify so directly used.*/
                var createdmedicine = await _httpClient.PostAsJsonAsync<Medicine>("api/v1/PharmaMedicine", medicine);

                return Ok(createdmedicine);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpPut]
        [ProducesResponseType(typeof(Medicine), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateMedicine([FromBody] Medicine medicine)
        {
            try
            {
                var createdmedicine = await _httpClient.PutAsJsonAsync<Medicine>("api/v1/PharmaMedicine", medicine);

                return Ok(createdmedicine);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpDelete("{id}")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteMedicineById(string id)
        {
            try
            {
                /*Ideally we should have used the API Gteway created Upstream url but we have to 
             enable conainer support to run and verify so directly used.*/
                var delete_uri = string.Format("api/v1/PharmaMedicine?id={0}", id);

                var deletresp = await _httpClient.DeleteAsync(delete_uri);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
