import 'isomorphic-fetch';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';

import Link from 'next/link';

export default class extends React.Component{

    static async getInitialProps({ query }){
        let [reqChannel, reqSeries, reqAudios] = await Promise.all([
            fetch(`https://api.audioboom.com/channels/${query.id}`),
            fetch(`https://api.audioboom.com/channels/${query.id}/child_channels`),
            fetch(`https://api.audioboom.com/channels/${query.id}/audio_clips`)
        ]);
      
        let dataChannel = await reqChannel.json();
        let channel = dataChannel.body.channel;
    
        let dataAudios = await reqAudios.json();
        let audioClips = dataAudios.body.audio_clips;
    
        let dataSeries = await reqSeries.json();
        let series = dataSeries.body.channels;
    
        return { channel, audioClips, series };
    }

    render(){
        const { channel, audioClips, series } = this.props;

        return(
            <Layout title={channel.title}>
                <h1>{channel.title}</h1>

                { series.length > 0 &&
                <div>
                    <h2>Series</h2>
                    <ChannelGrid channels={series} />
                </div>
                }

                <h2>Ultimos Podcasts</h2>
                <PodcastList podcasts={audioClips} />

                <style jsx>{`
                header {
                    color: #fff;
                    background: #8756ca;
                    padding: 15px;
                    text-align: center;
                }

                .banner {
                    width: 100%;
                    padding-bottom: 25%;
                    background-position: 50% 50%;
                    background-size: cover;
                    background-color: #aaa;
                }

                .channels {
                    display: grid;
                    grid-gap: 15px;
                    padding: 15px;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                }
                a.channel {
                    display: block;
                    margin-bottom: 0.5em;
                    color: #333;
                    text-decoration: none;
                }
                .channel img {
                    border-radius: 3px;
                    box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                    width: 100%;
                }
                h1 {
                    font-weight: 600;
                    padding: 15px;
                }
                h2 {
                    padding: 5px;
                    font-size: 0.9em;
                    font-weight: 600;
                    margin: 0;
                    text-align: center;
                }

                .podcast {
                    display: block;
                    text-decoration: none;
                    color: #333;
                    padding: 15px;
                    border-bottom: 1px solid rgba(0,0,0,0.2);
                    cursor: pointer;
                }
                .podcast:hover {
                    color: #000;
                }
                .podcast h3 {
                    margin: 0;
                }
                .podcast .meta {
                    color: #666;
                    margin-top: 0.5em;
                    font-size: 0.8em;
                }
            `}</style>
            </Layout>
        )
    }
}