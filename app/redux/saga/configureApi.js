import SanatografiApi from "./sanatografiApi";
import CustomHttpService from "../../services/CustomHttpService";

const sanatografiApi = new SanatografiApi();
const customHttpService = new CustomHttpService();

customHttpService.setConfig({
     API_PATH : 'http://localhost:8888' // android için -> http://10.0.2.2:8888
});

sanatografiApi.setHttpService(customHttpService);

export default sanatografiApi;