import { connect } from 'react-redux';
import Example from './components/example';

const mapStateToProps = (count: number) => ({ count });

export default connect(mapStateToProps)(Example);
