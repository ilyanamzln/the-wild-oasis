import supabase from "./supabase";
import { SUPABASE_URL } from "../utils/constants";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(cabin) {
  const { hasImagePath, imagePath, imageName } = getImagePath(cabin);
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Fail to add cabin");
  }

  if (hasImagePath) return data;

  await uploadImage(imageName, cabin.image, data.id);

  return data;
}

export async function updateCabin(cabin, id) {
  const { hasImagePath, imagePath, imageName } = getImagePath(cabin);
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Fail to update cabin");
  }

  if (hasImagePath) return data;

  await uploadImage(imageName, cabin.image, id);

  return data;
}

function getImagePath(cabin) {
  const hasImagePath = cabin?.image?.startsWith?.(SUPABASE_URL);

  let imagePath = "";
  let imageName = "";

  if (hasImagePath) {
    imagePath = cabin.image;
  } else {
    imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
    imagePath = hasImagePath
      ? updateCabin.image
      : `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  return { hasImagePath, imagePath, imageName };
}

async function uploadImage(imageName, image, cabinId) {
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabinId);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return null;
}
