import time
from bs4 import BeautifulSoup, NavigableString
import csv
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

def extract_data(url):
    # Use Selenium with Firefox to render the page
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0')
    options.add_argument('accept-language=fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3')
    
    try:
        driver = webdriver.Firefox(options=options)
        driver.get(url)
        time.sleep(5)  # Wait for page to fully load
        html = driver.page_source
        driver.quit()
    except Exception as e:
        print(f"Error fetching {url} with Selenium: {e}")
        return None

    soup = BeautifulSoup(html, 'html.parser')
    
    data = {}
    
    # Extract name from title
    if soup.title:
        title_text = soup.title.text.strip()
        if 'Libertines' in title_text:
            data['Nom du modèle'] = title_text.split('Libertines ')[1].split(',')[0].strip()
        else:
            data['Nom du modèle'] = 'N/A'
    else:
        data['Nom du modèle'] = 'N/A'
    
    # Find the ul with profile details
    profile_info = soup.find('div', class_='profile-info')
    if profile_info:
        ul = profile_info.find('ul')
        if ul:
            for li in ul.find_all('li', recursive=False):
                strong = li.find('strong')
                if strong:
                    key = strong.text.strip().rstrip(':')
                    value_parts = []
                    for child in li.contents:
                        if child == strong:
                            continue
                        if isinstance(child, NavigableString):
                            value_parts.append(str(child).strip())
                        elif child.name == 'a':
                            value_parts.append(child.text.strip())
                    value = ' '.join(value_parts).strip()
                    if not value:
                        value = li.get_text(strip=True).replace(strong.text, '').strip()
                    if key == 'Langues':
                        sub_ul = li.find('ul')
                        if sub_ul:
                            langs = [sub_li.get_text(strip=True).rstrip(':') for sub_li in sub_ul.find_all('li')]
                            value = ', '.join(langs)
                    data[key] = value
    
    # Extract A propos de moi using lambda
    about_header = soup.find(lambda tag: tag.name in ['h2', 'h3', 'div'] and 'a propos de moi' in tag.text.lower())
    if about_header:
        about_text = []
        sibling = about_header.next_sibling
        while sibling:
            if sibling.name and sibling.name.startswith('h'):
                break
            if isinstance(sibling, NavigableString):
                text = str(sibling).strip()
                if text:
                    about_text.append(text)
            elif sibling.name:
                text = sibling.get_text(strip=True)
                if text:
                    about_text.append(text)
            sibling = sibling.next_sibling
        full_about = ' '.join(about_text).replace('\n', ' ').strip()
        data['A propos de moi'] = full_about if full_about else 'N/A'
    else:
        data['A propos de moi'] = 'N/A'
    
    # Map to user-requested fields
    field_map = {
        'Sexe': 'Sexe',
        'Ethnique': 'Ethnique',
        'Nationalité': 'Nationalité',
        'Âge': 'Âge',
        'Yeux': 'Yeux',
        'Hauteur': 'Taille',
        'Poids': 'Poids',
        'Cheveux': 'Cheveux',
        'Cup': 'Cup',
        'Bust-taille-hanche': 'Bust-taille-hance',
        'Epilation du maillot': 'Epilation du maillot',
        'Ville de base': 'Ville de base',
        'Lieux de travail': 'Lieux de Travail',
        'Numéro de téléphone': 'Numéro de telephone',
        'Langues': 'Langues',
    }
    
    mapped_data = {
        'Nom du modèle': data.get('Nom du modèle', 'N/A'),
    }
    for src_key, dest_key in field_map.items():
        mapped_data[dest_key] = data.get(src_key, 'N/A')
    mapped_data['A propos de moi'] = data.get('A propos de moi', 'N/A')
    
    return mapped_data

# List of URLs to scrape
urls = [
    'https://www.sexemodel.com/escort/PrincessJasmine-286287/',
    # Add more URLs here
]

# Collect data
all_data = []
for url in urls:
    data = extract_data(url)
    if data:
        all_data.append(data)

# Write to CSV
if all_data:
    fields = list(all_data[0].keys())
    with open('extracted_data.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fields)
        writer.writeheader()
        writer.writerows(all_data)
    print("Data extracted and saved to extracted_data.csv")
else:
    print("No data extracted.")