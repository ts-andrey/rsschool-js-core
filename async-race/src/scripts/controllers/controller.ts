/* rendering header and main to work with everything */
import { RootView } from '../view/Root';
const rootView = new RootView();
rootView.render();

/* setting navigation controller */
import { navigationController } from './navigation';
navigationController();
