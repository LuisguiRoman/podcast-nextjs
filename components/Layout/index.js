import Link from 'next/link';
import Head from 'next/head';

export default class extends React.Component{
    render(){
        const { children, title } = this.props;

        return(
            <div>
                <Head>
                    <title>{title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>

                <header>
                    <Link href="/">
                        <a href="/">Podcasts</a>
                    </Link>
                </header>

                {children}

                <style jsx>{`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }
                    header a{
                        color: white;
                        text-decoration: none;
                    }
                `}</style>

                <style jsx>{`
                    h1{
                        color: red;
                    }
                    :global(p){
                        color: green;
                    }
                `}</style>

                <style jsx global>{`
                    body{
                        background: white;
                        font-family: system-ui;
                    }
                `}</style>
            </div>
        )
    }
}