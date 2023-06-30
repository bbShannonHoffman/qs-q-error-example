import {
    QSearchFrame,
    QSearchContentOptions,
    FrameOptions,
} from 'amazon-quicksight-embedding-sdk/dist/types';
import React, { useContext } from 'react';

import { QuickSightEmbedContext } from '../contexts/QuickSightEmbedContext';

export const QSearchBar: React.FunctionComponent = () => {

    const qSearchBarRef = React.useRef<QSearchFrame>();
    const embeddingContext = useContext(QuickSightEmbedContext);
    
    const embed = React.useCallback(async () => {
        if (embeddingContext !== null) {
            const { embedQSearchBar } = embeddingContext;
            const frameOptions: FrameOptions = {
                url: 'YOUR_Q_SEARCH_BAR_URL',
                height: 'AutoFit',
                container: '#q-searchbar-container',
                onChange: changeEvent => {
                    if (changeEvent.eventLevel === 'ERROR') {
                        console.error(
                            'QuickSight Q threw the following error: ',
                            changeEvent
                        );
                    }
                },
            };

            const contentOptions: QSearchContentOptions = {
                hideIcon: true,
                hideTopicName: false,
                theme: 'CLASSIC',
                allowTopicSelection: true,
                onMessage: messageEvent => {
                    switch (messageEvent.eventName) {
                        case 'CONTENT_LOADED': {
                            console.log('Q Search Bar loaded');
                            break;
                        }
                        case 'ERROR_OCCURRED': {
                            console.error('Q Search Bar error: ', messageEvent);
                            break;
                        }
                    }
                },
            };
            await embedQSearchBar(frameOptions, contentOptions);
        }
    }
    , [embeddingContext]);

    React.useEffect(() => {
        if (!qSearchBarRef.current) {
            embed().catch(() => {
                console.error('Failed to embed Q Search Bar');
            });
        }
    }, [embed, qSearchBarRef]);

    return (
        <div
            data-testid="q-searchbar-container"
            id="q-searchbar-container"
            title="Q Search Bar"
        />
    );
};
