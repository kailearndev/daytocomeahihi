import React from 'react';

import './loading.css'
import { Spin } from 'antd';

interface LoadingProps {
  loading: boolean
  children: React.ReactNode
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { children, loading = false } = props;
  return (
    <div className="example">
      <Spin spinning={loading}>{children}</Spin>
    </div>
  );
}

export default Loading;