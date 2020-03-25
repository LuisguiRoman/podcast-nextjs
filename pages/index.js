import 'isomorphic-fetch';
import Error from './_error';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

export default class extends React.Component{

    static async getInitialProps({ res }){
        try {
            let req = await fetch('https://api.audioboom.com/channels/recommended');
            let { body: channels } = await req.json();
            return { channels, statusCode: 200 };   
        } catch (error) {
            res.statusCode = 503;//notificar a next sobre el error en el servidor
            return { channels: null, statusCode: 503 };
        }
    }

    render(){
        const { channels, statusCode } = this.props;

        //early return
        if(statusCode !== 200 ){
            return <Error statusCode={statusCode} />
        }

        return(
            <Layout title="Podcasts">
                <ChannelGrid channels={channels} />
            </Layout>
        )
    }
}