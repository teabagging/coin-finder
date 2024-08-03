import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Assume you have already initialized firebaseApp
const storage = getStorage();

export async function projectImageUpload(file, creatorEmail, projectName) {
  try {
    // Assume file is a Blob or File object
    const storageRef = ref(storage, `${creatorEmail}/${projectName}/${file.name}`);

    // Use resumable upload, which is useful for large files
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      // Listen for upload progress
      uploadTask.on('state_changed',
        (snapshot) => {
          // Calculate upload progress percentage
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error); // Reject the promise on error
        },
        () => {
          // Upload completed successfully
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL); // Resolve the promise with the download URL
            })
            .catch((error) => {
              console.error('Failed to get download URL:', error);
              reject(error); // Reject the promise on error
            });
        }
      );
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Throw an error to be handled by the caller
  }
}
