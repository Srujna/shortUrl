import React, {useState, useEffect, useCallback} from 'react';
import UrlForm from './UrlForm';
import axios from 'axios'

const UrlFormContainer = () => {
    const serverPath = "http://localhost:5000/";
    const [urlError, setUrlError] = useState(false);
    const [url, setUrl] = useState("");
    const [tinyUrl, setTinyUrl] = useState("");

    const handleTinify = async () => {
        setTinyUrl("");
        try {
            new URL(url);
            setUrlError(false);
            axios.post(`${serverPath}url`, {'url': url })
                .then(res => {
                    setTinyUrl(`${serverPath}${res.data.alias}`);
                });
        } catch {
            setUrlError(true);
        }
    }

    const openInNew = () => {
        var win = window.open(tinyUrl, '_blank');
        win.focus();
    }

    return (
        <UrlForm 
            url={url}
            setUrl={setUrl}
            urlError= {urlError}
            handleTinify={handleTinify}
            tinyUrl={tinyUrl}
            openInNew={openInNew}
        />
    );
}
export default UrlFormContainer;