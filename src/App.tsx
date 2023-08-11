import { Row, Col } from 'antd';
import './App.css'
import DataList from './components/pages/Table';

function App() {


  return (
    <Row gutter={[16, 24]}>
      {/* <Col span={12}>
        <CalendarToday />
      </Col> */}

      <Col span={24}>
        <DataList />
      </Col>
    </Row>
  );
}
export default App
