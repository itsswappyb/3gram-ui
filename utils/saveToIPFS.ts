// importing axios
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const saveToIPFS = async (file: any): Promise<string> => {
  try {
    const web3StorageKey: string =
      process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY || '';

    // create a new multipart form data
    const formData = new FormData();
    // add file to the form data
    formData.append('file', file);

    var config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://api.web3.storage/upload',
      headers: {
        Authorization: `Bearer ${web3StorageKey}`,
        'Content-Type': 'text/plain',
      },
      data: formData,
    };

    // Posting the form data to the IPFS API
    const response: AxiosResponse<any> = await axios(config);
    // returning the CID
    return response.data.cid;
  } catch (err) {
    console.log(err);
    throw new Error('failed to save file');
  }
};

export default saveToIPFS;
