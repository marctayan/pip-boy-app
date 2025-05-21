import React, { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import PipBoyMap from './map'; // Adjust path if needed (e.g. './components/map')


function StatsScreen() {
    const [image, setImage] = useState("src/assets/images/stats page/STATS_PAGE.png");
    const [mapName, setMapName] = useState("stat-map"); // without the '#'
    const [showMap, setShowMap] = useState(false);
    const [showVaultBoy, setShowVaultBoy] = useState(true);
    const [showRadioWave, setShowRadioWave] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStation, setCurrentStation] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    
    // Audio refs for each radio station
    const newVegasAudio = useRef(new Audio('src/assets/Radio New Vegas (1).mp3'));
    const classicAudio = useRef(new Audio('src/assets/ca.mp3'));
    const diamondAudio = useRef(new Audio('src/assets/Diamond City Radio.mp3'));
    const wolfAudio = useRef(new Audio('src/assets/Wolfpack TV Radio (1).mp3'));
    const appAudio = useRef(new Audio('src/assets/Radio Appalachia.mp3'));
    const adeBuildingAudio = useRef(new Audio('src/assets/ADE D.mp3'));
    const tabTransitionSound = useRef(new Audio('src/assets/deck_ui_tab_transition_01.wav'));

    // Function to play tab transition sound
    const playTabSound = () => {
        tabTransitionSound.current.currentTime = 0;
        tabTransitionSound.current.play().catch(error => console.error('Error playing tab sound:', error));
    };

    // Initialize audio elements
    React.useEffect(() => {
        const audioElements = [newVegasAudio, classicAudio, diamondAudio, wolfAudio, appAudio, adeBuildingAudio, tabTransitionSound];
        
        audioElements.forEach(audioRef => {
            audioRef.current.load();
            audioRef.current.volume = 1.0;
            
            // Add event listeners for debugging
            audioRef.current.addEventListener('play', () => console.log('Audio started playing'));
            audioRef.current.addEventListener('pause', () => console.log('Audio paused'));
            audioRef.current.addEventListener('ended', () => console.log('Audio ended'));
            audioRef.current.addEventListener('error', (e) => console.error('Audio error:', e));
        });

        // Cleanup
        return () => {
            audioElements.forEach(audioRef => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            });
        };
    }, []);

    // Function to stop all audio
    const stopAllAudio = () => {
        try {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                setCurrentAudio(null);
            }
            setIsPlaying(false);
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    };

    // Function to play audio with error handling
    const playAudio = (audioPath, station) => {
        try {
            stopAllAudio();
            let audio;
            switch (station) {
                case 'newVegas':
                    audio = newVegasAudio.current;
                    break;
                case 'classic':
                    audio = classicAudio.current;
                    break;
                case 'diamond':
                    audio = diamondAudio.current;
                    break;
                case 'wolf':
                    audio = wolfAudio.current;
                    break;
                case 'app':
                    audio = appAudio.current;
                    break;
                case 'adeBuilding':
                    audio = adeBuildingAudio.current;
                    break;
                default:
                    audio = new Audio(audioPath);
            }
            audio.volume = 1.0;
            audio.currentTime = 0;
            audio.play().then(() => {
                setIsPlaying(true);
                setCurrentStation(station);
                setCurrentAudio(audio);
            }).catch(error => {
                console.error('Error playing audio:', error);
                setIsPlaying(false);
                setCurrentAudio(null);
            });
        } catch (error) {
            console.error('Error with audio:', error);
            setIsPlaying(false);
            setCurrentAudio(null);
        }
    };

    const handlePlayStop = () => {
        if (isPlaying) {
            stopAllAudio();
        } else if (currentStation) {
            switch (currentStation) {
                case 'newVegas':
                    playAudio('src/assets/Radio New Vegas (1).mp3', 'newVegas');
                    break;
                case 'classic':
                    playAudio('src/assets/ca.mp3', 'classic');
                    break;
                case 'diamond':
                    playAudio('src/assets/Diamond City Radio.mp3', 'diamond');
                    break;
                case 'wolf':
                    playAudio('src/assets/Wolfpack TV Radio (1).mp3', 'wolf');
                    break;
                case 'app':
                    playAudio('src/assets/Radio Appalachia.mp3', 'app');
                    break;
                case 'adeBuilding':
                    playAudio('src/assets/ADE D.mp3', 'adeBuilding');
                    break;
                default:
                    break;
            }
        }
    };

    const handleInvClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/inventory/INV_PAGE.png");
        setMapName("inv-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    };
    
    const handleInvWeaponsClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/inventory/INV_PAGE.png");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    };

    const handleInvArmorClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/inventory/INV_-_ARMOR.png");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    };

    const handleInvApparelClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/inventory/INV_-_APPAREL.png");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    };

    const handleInvFoodClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/inventory/INV_-_FOODDRINK.png");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    };

    const handleInvMiscClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/inventory/INV_-_MISC.png");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    };

    const handleStatClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/STATS_PAGE.png");
        setMapName("stat-map");
        setShowMap(false);
        setShowVaultBoy(true);
        setShowRadioWave(false);
    };

    const handleStatStatusClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/STATS_PAGE.png");
        setMapName("stat-map");
        setShowMap(false);
        setShowVaultBoy(true);
    }

    const handleStatSpecialClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL.png");
        setMapName("stat-special-map");
        setShowMap(false);
        setShowVaultBoy(false);
    }

    const handleStatsSpecialStrengthClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL_-_1.png")
        setMapName("stat-special-map");
    }

    const handleStatsSpecialPerceptionClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL_-_2.png")
    }

    const handleStatsSpecialEnduranceClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL_-_3.png")
    }

    const handleStatsSpecialCharismaClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL_-_4.png")
    }

    const handleStatsSpecialIntelligenceClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL_-_5.png")
    }

    const handleStatsSpecialAgilityClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL_-_6.png")
    }

    const handleStatsSpecialLuckClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/special/STATS_PAGE_-_SPECIAL_-_7.png")
    }


    const handleStatPerksClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/perks/STATS_PAGE_-_PERKS.png");
        setMapName("stat-perks-map");
        setShowVaultBoy(false);
    }

    const handleStatPerksScroungerClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/perks/STATS_PAGE_-_PERKS_1.png")
    }

    const handleStatPerksIdiotClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/perks/STATS_PAGE_-_PERKS_2.png")
    }

    const handleStatPerksAnimalClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/perks/STATS_PAGE_-_PERKS_3.png")
    }

    
    const handleStatPerksStrongClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/perks/STATS_PAGE_-_PERKS_4.png")
    }

    const handleStatPerksIronClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/stats page/perks/STATS_PAGE_-_PERKS_5.png")
    }

    const handleDataClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/DATA_PAGE.png");
        setMapName("data-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    };

    const handleDataQuestsClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/DATA_PAGE.png")
        setMapName("data-quests-map");
    }

    const handleDataQuestsDoingClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/quests/DATA_PAGE_QUESTS_1.png")
    }

    const handleDataQuestsTheClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/quests/DATA_PAGE_QUESTS_2.png")
    }

    const handleDataQuestsCleanClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/quests/DATA_PAGE_QUESTS_3.png")
    }

    const handleDataQuestsDeliveryClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/quests/DATA_PAGE_QUESTS_4.png")
    }

    const handleDataQuestsTroubleClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/quests/DATA_PAGE_QUESTS_5.png")
    }

    const handleDataQuestsKeepingClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/quests/DATA_PAGE_QUESTS_6.png")
    }


    const handleDataStatsClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/stats/DATA_PAGE_-STATS.png");
        setMapName("data-stats-map")
    };
    
    const handleDataNotesClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/notes/DATA_PAGE_-_NOTES.png")
        setMapName("data-notes-map")
    }

    const handleDataNotesPoemClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/notes/DATA_PAGE_-_NOTES_1.png")

    }

    const handleDataNotesFamilyClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/notes/DATA_PAGE_-_NOTES_2.png")

    }

    const handleDataNotesDamagedClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/notes/DATA_PAGE_-_NOTES_3.png")

    }

    const handleDataNotesDiscardedClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/data page/notes/DATA_PAGE_-_NOTES_4.png")

    }

    const handleMapClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/map/MAP_PAGE.png");
        setMapName("map-map");
        setShowMap(true);
        setShowVaultBoy(false);
        setShowRadioWave(false);
    }

    const handleRadioClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/radio/RADIO_PAGE.png");
        setMapName("radio-map");
        setShowMap(false);
        setShowVaultBoy(false);
        // Don't hide radio wave or stop audio when clicking radio tab
    };
    

    const handleRadioNewVegasClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/radio/RADIO_PAGE_1.png");
        setMapName("radio-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(true);
        playAudio('src/assets/Radio New Vegas (1).mp3', 'newVegas');
    }
    
    const handleRadioClassicClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/radio/RADIO_PAGE_2.png");
        setMapName("radio-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(true);
        playAudio('src/assets/ca.mp3', 'classic');
    }

    const handleRadioDiamondClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/radio/RADIO_PAGE_3.png");
        setMapName("radio-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(true);
        playAudio('src/assets/Diamond City Radio.mp3', 'diamond');
    }

    const handleRadioAppClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/radio/RADIO_PAGE_4.png");
        setMapName("radio-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(true);
        playAudio('src/assets/Radio Appalachia.mp3', 'app');
    }

    const handleRadioWolfClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/radio/RADIO_PAGE_5.png");
        setMapName("radio-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(true);
        playAudio('src/assets/Wolfpack TV Radio (1).mp3', 'wolf');
    }

    const handleRadioAdeBuildingClick = (e) => {
        e.preventDefault();
        playTabSound();
        setImage("src/assets/images/radio/RADIO_PAGE_6.png");
        setMapName("radio-map");
        setShowMap(false);
        setShowVaultBoy(false);
        setShowRadioWave(true);
        playAudio('src/assets/ADE D.mp3', 'adeBuilding');
    }

    

    

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            position: 'relative',
        }}>
            <div style={{ position: 'relative' }}>
                <img src={image} useMap={`#${mapName}`} />

                {showMap && (
                    <div style={{
                        position: 'absolute',
                        top: '55%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        height: '250px',
                        zIndex: 1000,
                    }}>
                        <PipBoyMap />
                    </div>
                )}

                {showVaultBoy && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '150px',
                        height: '150px',
                        zIndex: 1000,
                    }}>
                        <img 
                            src="src/assets/images/vault-boy.gif" 
                            alt="Vault Boy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                )}

                {showRadioWave && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10%',
                        transform: 'translateY(-50%)',
                        width: '200px',
                        height: '250px',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '10px'
                        }}>
                            <button 
                                onClick={handlePlayStop}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#00ff00',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontFamily: 'monospace',
                                    fontWeight: 'bold'
                                }}
                            >
                                {isPlaying ? 'STOP' : 'PLAY'}
                            </button>
                        </div>
                        <img 
                            src="src/assets/images/radiowaves.gif" 
                            alt="Radio Wave"
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                )}

                {/* Render both maps, browser will only use the one specified in useMap */}

                <map name="map-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                </map>

                <map name="inv-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleInvWeaponsClick} alt="inv-weapons" title="inv-weapons" href="#" coords="89,66,204,101" shape="rect"/>
                    <area onClick={handleInvArmorClick} alt="inv-armor" title="inv-armor" href="#" coords="235,73,325,101" shape="rect"/>
                    <area onClick={handleInvApparelClick} alt="inv-apparel" title="inv-apparel" href="#" coords="353,71,456,105" shape="rect"/>
                    <area onClick={handleInvFoodClick} alt="inv-food" title="inv-food" href="#" coords="481,73,618,99" shape="rect"/>
                    <area onClick={handleInvMiscClick} alt="inv-misc" title="inv-misc" href="#" coords="652,69,725,101" shape="rect"/>
                </map>


                <map name="stat-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleStatStatusClick} alt="stat-status" title="stat-status" href="#" coords="172,73,266,100" shape="rect"/>
                    <area onClick={handleStatSpecialClick} alt="stat-special" title="stat-special" href="#" coords="354,69,452,100" shape="rect"/>
                    <area onClick={handleStatPerksClick} alt="stat-perks" title="stat-perks" href="#" coords="546,69,619,99" shape="rect"/>
                </map>

                <map name="stat-special-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleStatPerksClick} alt="stat-perks" title="stat-perks" href="#" coords="546,69,619,99" shape="rect"/>
                    <area onClick={handleStatStatusClick} alt="stat-status" title="stat-status" href="#" coords="172,73,266,100" shape="rect"/>
                    <area onClick={handleStatsSpecialStrengthClick} alt="stat-special-strength" title="stat-special-strength" href="#" coords="36,119,347,150" shape="rect"/>
                    <area onClick={handleStatsSpecialPerceptionClick} alt="stat-special-perception" title="stat-special-perception" href="#" coords="37,154,348,182" shape="rect"/>
                    <area onClick={handleStatsSpecialEnduranceClick} alt="stat-special-endurance" title="stat-special-endurance" href="#" coords="41,192,347,213" shape="rect"/>
                    <area onClick={handleStatsSpecialCharismaClick} alt="stat-special-charisma" title="stat-special-charisma" href="#" coords="41,221,349,240" shape="rect"/>
                    <area onClick={handleStatsSpecialIntelligenceClick} alt="stat-special-intelligence" title="stat-special-intelligence" href="#" coords="43,253,353,274" shape="rect"/>
                    <area onClick={handleStatsSpecialAgilityClick} alt="stat-special-agility" title="stat-special-agility" href="#" coords="40,285,351,306" shape="rect"/>
                    <area onClick={handleStatsSpecialLuckClick} alt="stat-special-luck" title="stat-special-luck" href="#" coords="42,311,354,337" shape="rect"/>
                </map>

                <map name="stat-perks-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleStatStatusClick} alt="stat-status" title="stat-status" href="#" coords="172,73,266,100" shape="rect"/>
                    <area onClick={handleStatSpecialClick} alt="stat-special" title="stat-special" href="#" coords="354,69,452,100" shape="rect"/>
                    <area onClick={handleStatPerksClick} alt="stat-perks" title="stat-perks" href="#" coords="546,69,619,99" shape="rect"/>
                    <area onClick={handleStatPerksScroungerClick} alt="stat-perks-scrounger" title="stat-perks-scrounger" href="#" coords="39,119,153,146" shape="rect"/>
                    <area onClick={handleStatPerksIdiotClick} alt="stats-perks-idiot" title="stats-perks-idiot" href="#" coords="41,156,157,182" shape="rect"/>
                    <area onClick={handleStatPerksAnimalClick} alt="stats-perks-animal" title="stats-perks-animal" href="#" coords="41,191,170,212" shape="rect"/>
                    <area onClick={handleStatPerksStrongClick} alt="stats-perks-strong" title="stats-perks-strong" href="#" coords="41,222,164,241" shape="rect"/>
                    <area onClick={handleStatPerksIronClick} alt="stats-perks-iron" title="stats-perks-iron" href="#" coords="40,250,133,277" shape="rect"/>
                </map>
                

                <map name="data-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleDataQuestsClick} alt="data-quests" title="data-quests" href="#" coords="175,69,268,104" shape="rect"/>
                    <area onClick={handleDataStatsClick} alt="data-stats" title="data-stats" href="#" coords="364,69,433,101" shape="rect"/>
                    <area onClick={handleDataNotesClick}  alt="data-notes" title="data-notes" href="#" coords="529,69,612,100" shape="rect"/>
                    <area onClick={handleDataQuestsDoingClick} alt="data-quests-doing" title="data-quests-doing" href="#" coords="40,132,264,153" shape="rect"/>
                    <area onClick={handleDataQuestsTheClick} alt="data-quests-the" title="data-quests-the" href="#" coords="37,167,221,193" shape="rect"/>
                    <area onClick={handleDataQuestsCleanClick} alt="data-quests-clean" title="data-quests-clean" href="#" coords="32,201,180,225" shape="rect"/>
                    <area onClick={handleDataQuestsDeliveryClick} alt="data-quests-delivery!" title="data-quests-delivery!" href="#" coords="39,243,130,265" shape="rect"/>
                    <area onClick={handleDataQuestsTroubleClick} alt="data-quests-trouble" title="data-quests-trouble" href="#" coords="39,277,353,305" shape="rect"/>
                    <area onClick={handleDataQuestsKeepingClick} alt="data-quests-keeping" title="data-quests-keeping" href="#" coords="39,313,205,341" shape="rect"/>
                </map>

                <map name="data-quests-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleDataQuestsClick} alt="data-quests" title="data-quests" href="#" coords="175,69,268,104" shape="rect"/>
                    <area onClick={handleDataStatsClick} alt="data-stats" title="data-stats" href="#" coords="364,69,433,101" shape="rect"/>
                    <area onClick={handleDataNotesClick}  alt="data-notes" title="data-notes" href="#" coords="529,69,612,100" shape="rect"/>
                    <area onClick={handleDataQuestsDoingClick} alt="data-quests-doing" title="data-quests-doing" href="#" coords="40,132,264,153" shape="rect"/>
                    <area onClick={handleDataQuestsTheClick} alt="data-quests-the" title="data-quests-the" href="#" coords="37,167,221,193" shape="rect"/>
                    <area onClick={handleDataQuestsCleanClick} alt="data-quests-clean" title="data-quests-clean" href="#" coords="32,201,180,225" shape="rect"/>
                    <area onClick={handleDataQuestsDeliveryClick} alt="data-quests-delivery!" title="data-quests-delivery!" href="#" coords="39,243,130,265" shape="rect"/>
                    <area onClick={handleDataQuestsTroubleClick} alt="data-quests-trouble" title="data-quests-trouble" href="#" coords="39,277,353,305" shape="rect"/>
                    <area onClick={handleDataQuestsKeepingClick} alt="data-quests-keeping" title="data-quests-keeping" href="#" coords="39,313,205,341" shape="rect"/>


                </map>
                    
                <map name="data-stats-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleDataQuestsClick} alt="data-quests" title="data-quests" href="#" coords="175,69,268,104" shape="rect"/>
                    <area onClick={handleDataNotesClick}  alt="data-notes" title="data-notes" href="#" coords="529,69,612,100" shape="rect"/>

                </map>

                <map name="data-notes-map">
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleDataStatsClick} alt="data-stats" title="data-stats" href="#" coords="364,69,433,101" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleDataQuestsClick} alt="data-quests" title="data-quests" href="#" coords="175,69,268,104" shape="rect"/>
                    <area onClick={handleDataNotesClick}  alt="data-notes" title="data-notes" href="#" coords="529,69,612,100" shape="rect"/>
                    <area onClick={handleDataNotesPoemClick} alt="data-notes-poem" title="data-notes-poem" href="#" coords="35,128,325,156" shape="rect"/>
                    <area onClick={handleDataNotesFamilyClick} alt="data-notes-family" title="data-notes-family" href="#" coords="33,166,181,193" shape="rect"/>
                    <area onClick={handleDataNotesDamagedClick} alt="data-notes-damaged" title="data-notes-damaged" href="#" coords="36,206,174,229" shape="rect"/>
                    <area onClick={handleDataNotesDiscardedClick} alt="data-notes-discarded" title="data-notes-discarded" href="#" coords="33,241,189,269" shape="rect"/>
                </map>
                
                <map name="radio-map">
                    <area onClick={handleMapClick} alt="map" title="map" href="#" coords="525,9,599,56" shape="rect"/>
                    <area onClick={handleInvClick} alt="inv" title="inv" href="#" coords="211,12,273,56" shape="rect" />
                    <area onClick={handleStatClick} alt="stat" title="stat" href="#" coords="53,17,125,57" shape="rect" />
                    <area onClick={handleDataClick} alt="data" title="data" href="#" coords="358,13,441,55" shape="rect" />
                    <area onClick={handleRadioClick} alt="radio" title="radio" href="#" coords="654,13,755,58" shape="rect"/>
                    <area onClick={handleRadioNewVegasClick} alt="radio-new-vegas" title="radio-new-vegas" href="#" coords="38,124,201,159" shape="rect"/>
                    <area onClick={handleRadioClassicClick} alt="radio-classical" title="radio-classical" href="#" coords="37,167,193,189" shape="rect"/>
                    <area onClick={handleRadioDiamondClick} alt="radio--diamond" title="radio--diamond" href="#" coords="37,202,222,229" shape="rect"/>
                    <area onClick={handleRadioWolfClick} alt="radio-wolf" title="radio-wolf" href="#" coords="36,277,167,300" shape="rect"/>
                    <area onClick={handleRadioAdeBuildingClick} alt="radio-ade" title="radio-ade" href="#" coords="41,317,288,340" shape="rect"/>
                    <area onClick={handleRadioAppClick} alt="radio-app" title="radio-app" href="#" coords="36,238,211,268" shape="rect"/>
                    
                </map>
                
            </div>
        </div>
    );
}

export default StatsScreen;
