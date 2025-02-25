from bs4 import BeautifulSoup
import json
import random
import re
import requests
import time


# def scrape_operator_images(name, retries=10, backoff_factor=5):
#     """
#     Given an operator's name, scrapes Arknights.wiki.gg for image URLs of their icon,
#     elite 2 icon, & tooltip & returns them in a dictionary with retry & backoff
#     """
#     name_encoded = name.replace(" ", "_").replace("'", "%27")  # URL encode name
#     urls = {
#         "icon": f"https://arknights.wiki.gg/wiki/File:{name_encoded}_icon.png",
#         "elite_2_icon": f"https://arknights.wiki.gg/wiki/File:{name_encoded}_Elite_2_icon.png",
#         "tooltip": f"https://arknights.wiki.gg/wiki/File:{name_encoded}_tooltip.png",
#     }
#     image_urls = {}

#     for key, url in urls.items():
#         for attempt in range(retries):
#             try:
#                 response = requests.get(url)
#                 # response.raise_for_status()  # Raise an exception for bad status codes

#                 soup = BeautifulSoup(response.content, "html.parser")
#                 a_tag = soup.find(
#                     "a",
#                     title=re.compile(
#                         f"{name} {key.replace('_', ' ')}.png", re.IGNORECASE
#                     ),
#                 )  # Case insensitive regex matching

#                 if a_tag:
#                     image_urls[f"{key}_url"] = (
#                         "https://arknights.wiki.gg" + a_tag["href"]
#                     )
#                 else:
#                     image_urls[f"{key}_url"] = ""
#                 break  # Exit the retry loop if successful

#             except requests.exceptions.RequestException as e:
#                 wait_time = backoff_factor * (2**attempt) + random.uniform(
#                     0, 1
#                 )  # Exponential backoff + jitter
#                 print(
#                     f"Error fetching {url}: {e}. Retrying in {wait_time:.2f} seconds..."
#                 )
#                 time.sleep(wait_time)
#             except Exception as e:
#                 print(f"An unexpected error occurred for {url}: {e}")
#                 return None
#         else:
#             print(f"Failed to fetch {url} after {retries} retries.")
#             image_urls[f"{key}_url"] = ""

#     return image_urls


# # character_name = "Ch'en the Holungday"
# # image_links = scrape_operator_images(character_name)

# # if image_links:
# #     print(image_links)

# # character_name = "Exusiai"
# # image_links = scrape_operator_images(character_name)

# # if image_links:
# #     print(image_links)

# # character_name = "12F"  # Example where Elite 2 is missing
# # image_links = scrape_operator_images(character_name)

# # if image_links:
# #     print(image_links)


# with open("arknights_character_table_filtered_2.json", "r", encoding="utf-8") as file:
#     operators = json.load(file)
#     new_data = {}

#     print(len(operators))

#     # sed -i '2,[line of last curly brace]d' arknights_character_table_filtered_2.json

#     for i in range(0, len(operators), 30):
#         for operator in operators[i : i + 30]:
#             print(operators.index(operator))
#             if operator:
#                 operator_images = scrape_operator_images(operator["name"])
#                 print(operator_images)
#                 new_data[f"{operator['name']}"] = operator_images

#         with open(
#             "arknights_operator_images.json", "r", encoding="utf-8"
#         ) as images_file:
#             existing_data = json.load(images_file)

#         operator_image_urls = existing_data.copy()
#         operator_image_urls.update(new_data)

#         with open(
#             "arknights_operator_images.json", "w", encoding="utf-8"
#         ) as images_file:
#             json.dump(operator_image_urls, images_file, indent=2, ensure_ascii=False)

#         time.sleep(5)


# Upgrade material images: https://arknights.wiki.gg/wiki/Category:Upgrade_material_images
def scrape_material_images(name, retries=10, backoff_factor=5):
    """
    Given a material's name, scrapes Arknights.wiki.gg for its image URL & returns
    it in a dictionary with retry & backoff
    """
    url = {
        "icon": f"https://arknights.wiki.gg/wiki/File:{name}.png",
    }
    image_urls = {}

    for key, url in url.items():
        for attempt in range(retries):
            try:
                response = requests.get(url)
                # response.raise_for_status()  # Raise an exception for bad status codes

                soup = BeautifulSoup(response.content, "html.parser")
                a_tag = soup.find(
                    "a",
                    title=re.compile(f"{name}.png", re.IGNORECASE),
                )  # Case insensitive regex matching

                if a_tag:
                    image_urls[f"{key}_url"] = (
                        "https://arknights.wiki.gg" + a_tag["href"]
                    )
                else:
                    image_urls[f"{key}_url"] = ""
                break  # Exit the retry loop if successful

            except requests.exceptions.RequestException as e:
                wait_time = backoff_factor * (2**attempt) + random.uniform(
                    0, 1
                )  # Exponential backoff + jitter
                print(
                    f"Error fetching {url}: {e}. Retrying in {wait_time:.2f} seconds..."
                )
                time.sleep(wait_time)
            except Exception as e:
                print(f"An unexpected error occurred for {url}: {e}")
                return None
        else:
            print(f"Failed to fetch {url} after {retries} retries.")
            image_urls[f"{key}_url"] = ""

    return image_urls


# material_name = "Aketon"
# image_links = scrape_material_images(material_name)

# if image_links:
#     print(image_links)

# material_name = "Aggregate Cyclicene"
# image_links = scrape_material_images(material_name)

# if image_links:
#     print(image_links)


with open("arknights_item_table.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    items = data["items"]
    materials = [
        item["name"]
        for _item_id, item in items.items()
        if item["iconId"].startswith("MTL_SL")
    ]
    new_data = {}

    print(len(materials))

    for i in range(49, len(materials), 30):
        for material in materials[i : i + 30]:
            print(materials.index(material))
            if material:
                material_image = scrape_material_images(material)
                print(material_image)
                new_data[material] = material_image

        with open("arknights_item_images.json", "r", encoding="utf-8") as images_file:
            existing_data = json.load(images_file)

        item_image_urls = existing_data.copy()
        item_image_urls.update(new_data)

        with open("arknights_item_images.json", "w", encoding="utf-8") as images_file:
            json.dump(item_image_urls, images_file, indent=2, ensure_ascii=False)

        time.sleep(5)
