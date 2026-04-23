using System.Text.Json;

namespace MvcToVue.Helpers;

public class ViteHelper
{
    private readonly Dictionary<string, ManifestEntry> _manifest;

    public ViteHelper(string manifestPath)
    {
        var manifestJson = File.ReadAllText(manifestPath);
        var manifest = JsonSerializer.Deserialize<Dictionary<string, ManifestEntry>>(manifestJson,
            new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            });
        _manifest = manifest ?? new Dictionary<string, ManifestEntry>();
    }
    
    public string GetFile(string entryName)
    {
        return _manifest.TryGetValue(entryName, out var entry)
            ? "/dist/" + entry.File
            : throw new ArgumentException($"Entry '{entryName}' not found in manifest.");
    }

    public string GetCss(string entryName)
    {
        return _manifest.TryGetValue(entryName, out var entry)
            ? "/dist/" + entry.Css[0]
            : throw new ArgumentException($"Entry '{entryName}' not found in manifest.");
    }
}

public record ManifestEntry(string File, string[] Css);
