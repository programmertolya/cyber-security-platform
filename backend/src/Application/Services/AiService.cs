using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;

namespace CyberSecurity.Application.Services
{
    public class AiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _ollamaUrl;
        private readonly string _modelName = "qwen2.5:3b";

        public AiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _ollamaUrl = Environment.GetEnvironmentVariable("OLLAMA_URL") ?? "http://localhost:11434";
        }

        public async IAsyncEnumerable<string> GetHintStreamAsync(string prompt, CancellationToken cancellationToken)
        {
            var requestData = new
            {
                model = _modelName,
                prompt = $"Ты - русскоязычный помощник по информационной безопасности. Ответь на вопрос: {prompt}",
                stream = true,
            };

            var jsonContent = new StringContent(
                JsonSerializer.Serialize(requestData),
                Encoding.UTF8,
                "application/json");

            var request = new HttpRequestMessage(HttpMethod.Post, $"{_ollamaUrl}/api/generate")
            {
                Content = jsonContent
            };

            var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken);
            response.EnsureSuccessStatusCode();

            var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            var reader = new StreamReader(stream);

            try
            {
                while (!cancellationToken.IsCancellationRequested)
                {
                    if (reader.EndOfStream) break;

                    var line = await reader.ReadLineAsync();
                    if (string.IsNullOrEmpty(line)) continue;

                    try
                    {
                        using var doc = JsonDocument.Parse(line);
                        if (doc.RootElement.TryGetProperty("response", out var responseProp))
                        {
                            var text = responseProp.GetString();
                            if (!string.IsNullOrEmpty(text))
                            {
                                yield return text;
                            }
                        }
                    }
                    finally { }
                }
            }
            finally
            {
                reader.Dispose();
                stream.Dispose();
                response.Dispose();
            }
        }
    }
}