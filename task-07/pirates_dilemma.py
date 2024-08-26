import click
import os
import hashlib
import requests
from bs4 import BeautifulSoup
from imdb import IMDb

def compute_movie_hash(filepath):
    """Compute the hash of the movie file for subtitle search."""
    with open(filepath, 'rb') as f:
        hash_obj = hashlib.md5()
        chunk = f.read(1024)
        while chunk:
            hash_obj.update(chunk)
            chunk = f.read(1024)
        return hash_obj.hexdigest()

def get_file_size(filepath):
    """Get the file size of the movie file."""
    return os.path.getsize(filepath)

def find_imdb_id(filepath):
    """Find the IMDb ID of a movie based on its filename using IMDbPY."""
    filename = os.path.basename(filepath)
    title = os.path.splitext(filename)[0]

    ia = IMDb()

    search_results = ia.search_movie(title)

    if search_results:
        movie = search_results[0]
        return movie.movieID
    else:
        return None

def sort_by_downloads(subtitle):
    """Return the number of downloads for sorting."""
    return subtitle.get('downloads', 0)

def get_subtitles(imdb_id, language):
    """Scrape subtitles from OpenSubtitles based on search parameters."""
    url = f"https://www.opensubtitles.org/en/search/sublanguageid-{language}/imdbid-{imdb_id}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    subtitles = []
    for subtitle_row in soup.select('.change'):
        title = subtitle_row.select_one('.bnone').text.strip() if subtitle_row.select_one('.bnone') else 'Unknown Title'
        lang = subtitle_row.select_one('.flag').text.strip() if subtitle_row.select_one('.flag') else 'Unknown Language'
        download_link = subtitle_row.select_one('.bnone')['href'] if subtitle_row.select_one('.bnone') else None
        downloads = int(subtitle_row.select_one('.news').text.strip()) if subtitle_row.select_one('.news') else 0

        if download_link:
            subtitles.append({'title': title, 'language': lang, 'download_link': f"https://www.opensubtitles.org{download_link}", 'downloads': downloads})

    subtitles.sort(key=sort_by_downloads, reverse=True)

    return subtitles

def download_subtitle(subtitle, output_dir):
    """Download the selected subtitle."""
    response = requests.get(subtitle['download_link'])
    subtitle_path = os.path.join(output_dir, f"{subtitle['title']}.srt")
    with open(subtitle_path, 'wb') as f:
        f.write(response.content)
    click.echo(f"Downloaded {subtitle['title']} to {output_dir}")

def batch_download_subtitles(directory, language, output):
    """Batch download subtitles for all movies in a directory."""
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".mp4"):
                file_path = os.path.join(root, file)
                imdb_id = find_imdb_id(file_path)
                subtitles = get_subtitles(imdb_id, language)
                if subtitles:
                    download_subtitle(subtitles[0], output)

@click.command()
@click.argument('file', type=click.Path(exists=True))
@click.option('-l', '--language', default='eng', help='Filter subtitles by language.')
@click.option('-o', '--output', default='.', help='Specify the output folder for the subtitles.')
@click.option('-b', '--batch-download', is_flag=True, help='Enable batch mode.')
def main(file, language, output, batch_download):
    """Main function for handling user input and performing subtitle search and download."""
    if batch_download:
        batch_download_subtitles(file, language, output)
    else:
        imdb_id = find_imdb_id(file)
        subtitles = get_subtitles(imdb_id, language)
        if subtitles:
            click.echo("Subtitles found:")
            for i, subtitle in enumerate(subtitles, 1):
                click.echo(f"{i}: {subtitle['title']} ({subtitle['language']})")
            choice = click.prompt("Choose a subtitle to download", type=int)
            download_subtitle(subtitles[choice - 1], output)
        else:
            click.echo("No subtitles found.")

if __name__ == '__main__':
    main()
