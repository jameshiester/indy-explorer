import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const RouterLink = (props, ref) => <Link innerRef={ref} {...props} />;

export default React.forwardRef(RouterLink);
