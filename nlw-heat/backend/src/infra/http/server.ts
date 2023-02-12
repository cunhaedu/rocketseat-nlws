import api from 'config/api';
import { serverHttp } from './app';

serverHttp.listen(api.PORT || 3333, () => {
  console.log(`Server is Running on port ${api.PORT || 3333}`);
});
