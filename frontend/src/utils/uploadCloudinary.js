const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();

    // IMPORTANT: Replace these with your own Cloudinary credentials
    // 1. Create a Cloudinary account at https://cloudinary.com/
    // 2. Go to Settings > Upload > Upload presets
    // 3. Create an "Unsigned" upload preset
    const upload_preset = "medicare-app"; // Replace with your preset name
    const cloud_name = "dxyz123";      // Replace with your cloud name

    uploadData.append("file", file);
    uploadData.append("upload_preset", upload_preset); 
    uploadData.append("cloud_name", cloud_name); 

    console.log(`Uploading to Cloudinary with preset: ${upload_preset} and cloud: ${cloud_name}`);

    try {
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
                method: "post",
                body: uploadData,
            }
        );

        console.log("Cloudinary fetch response status:", res.status);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in uploadImageToCloudinary fetch:", error);
        throw error;
    }
};

export default uploadImageToCloudinary;
