import ReactDOM from 'react-dom';

import router from './router';
import register from './register-service-worker';


ReactDOM.render(router, document.getElementById('root'));
register();
