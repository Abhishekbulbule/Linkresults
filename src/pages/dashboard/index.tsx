import { FC } from 'react';
import Header from '../../components/base/header/Header';
import Sidebar from '../../components/base/sidebar/Sidebar';
import MainContainer from '../../components/post/MainContainer';

const Dashboard: FC = () => {
	return (
		<div>
			<Header />
			<Sidebar />
			<MainContainer />
		</div>
	);
};

export default Dashboard;