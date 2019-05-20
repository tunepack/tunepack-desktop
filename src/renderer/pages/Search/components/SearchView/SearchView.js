import React from 'react'
import styles from './SearchView.scss'
import SearchForm from '../SearchForm/SearchForm'
import SearchResult from '../SearchResult/SearchResult'
import Spinner from 'components/Spinner/Spinner'
import search from 'handlers/search'
import searchResultUtils from 'utils/searchResults'
import download from 'handlers/download'
import { ipcRenderer } from 'electron'
import * as Channel from 'constants/channel'
import { connect } from 'react-redux'
import { getData } from '../../../../selectors/settings'
import * as AudioFileExtension from 'constants/AudioFileExtension'

const DEV_SEARCH_RESULTS = `[{"bitrate":320,"file":"@@pihrd\\\\MP3\\\\_Archive\\\\_Blind Test Os à Moelle 2019_01_29\\\\Levi's\\\\Extrait\\\\10 Justice - Genesis.mp3","size":528196,"slots":true,"speed":416604,"user":"domdomdom822"},{"bitrate":320,"file":"@@mgygz\\\\Emmep3\\\\Agnostic Front\\\\1987- Liberty & Justice For\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":860004,"user":"frenkio186"},{"bitrate":320,"file":"d:\\\\music\\\\hard core\\\\agnostic front\\\\1987- liberty & justice for\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":761857,"user":"carlopeludo@gmail.com"},{"bitrate":320,"file":"@@gmfwe\\\\MP3\\\\2-ELEKTRO\\\\Justice\\\\Various Remixes\\\\Genesis (Menowah Remix).mp3","size":7078225,"slots":true,"speed":1264692,"user":"phoenek"},{"bitrate":320,"file":"@@bvenl\\\\+++MuSICA\\\\Justice\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":1688606,"user":"techxvnode"},{"bitrate":320,"file":"@@gsrhb\\\\My Music\\\\Agnostic Front\\\\Liberty & Justice For.._\\\\04 Genesis.mp3","size":3876959,"slots":true,"speed":597255,"user":"xjshawx"},{"bitrate":320,"file":"@@rxqrg\\\\music\\\\Agnostic Front\\\\1987- Liberty & Justice For\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":576522,"user":"these2boots"},{"bitrate":320,"file":"@@alfzo\\\\MY MUSIC\\\\A\\\\Agnostic Front\\\\1987 - liberty & justice for\\\\04 - genesis.mp3","size":4014150,"slots":true,"speed":567477,"user":"thesnuffpunk"},{"bitrate":320,"file":"@@vxhsh\\\\Área Compartida\\\\Punk\\\\Hardcore\\\\Albums\\\\America\\\\Agnostic Front (Usa) - Liberty & Justice For (1987)\\\\04- Genesis.mp3","size":4145538,"slots":true,"speed":576609,"user":"Vercingetorix"},{"bitrate":320,"file":"@@gmfwe\\\\MP3\\\\2-ELEKTRO\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":1264692,"user":"phoenek"},{"bitrate":320,"file":"@@vrgud\\\\Musique\\\\A\\\\Agnostic Front\\\\1987 - Liberty & Justice For\\\\04. Genesis.mp3","size":3897344,"slots":true,"speed":476552,"user":"metrosdepot"},{"bitrate":320,"file":"@@dfjiu\\\\Soulseek\\\\Music\\\\Agnostic Front\\\\Liberty & Justice For.._\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":469641,"user":"postalp"},{"bitrate":320,"file":"\\\\Users\\\\Flauzino\\\\Music\\\\iTunes\\\\iTunes Media\\\\Music\\\\Justice\\\\†\\\\01 Genesis.mp3","size":9459638,"slots":true,"speed":1043165,"user":"slowseeker"},{"bitrate":320,"file":"@@jlhff\\\\Hencko Music\\\\MP3\\\\Justice..†..Cross\\\\1-01 Genesis.mp3","size":9461568,"slots":true,"speed":932748,"user":"Hencko"},{"bitrate":320,"file":"@@bvenl\\\\+++MuSICA\\\\Justice\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":1688606,"user":"techxvnode"},{"bitrate":320,"file":"@@aedck\\\\+Artists\\\\Justice\\\\Remixes (128-320)\\\\Justice - Genesis (Menowah Remix).mp3","size":7078225,"slots":true,"speed":676614,"user":"wellkn0wN"},{"bitrate":320,"file":"@@meleg\\\\Music\\\\Hardcore\\\\Agnostic Front\\\\1987- Liberty & Justice For\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":364736,"user":"dzimi"},{"bitrate":320,"file":"@@mxfwt\\\\Music\\\\Justice\\\\Cross\\\\1 - Justice - Genesis.mp3","size":9424529,"slots":true,"speed":874424,"user":"Halcyon220"},{"bitrate":320,"file":"@@kmhco\\\\All\\\\Justice\\\\†\\\\01 - Genesis.mp3","size":9439242,"slots":true,"speed":839079,"user":"JusticeJill"},{"bitrate":320,"file":"@@fhmze\\\\muzak\\\\Music\\\\Justice\\\\Check The Availability\\\\Genesis (Chewy Chocolate Cookie Remix).mp3","size":6499233,"slots":true,"speed":577404,"user":"nicktheduke"},{"bitrate":320,"file":"@@sarkb\\\\Music\\\\Agnostic Front\\\\agnostic front - liberty and justice for... (1987)\\\\04 genesis.mp3","size":3888160,"slots":true,"speed":321720,"user":"Jo Fury"},{"bitrate":320,"file":"@@hfaad\\\\music_files\\\\downloaded\\\\complete\\\\Library\\\\Justice - Genesis (Chewy Chocolate Cookies Remix).mp3","size":6593542,"slots":true,"speed":540804,"user":"square15"},{"bitrate":320,"file":"@@ueoal\\\\iTunes Media\\\\Music\\\\Justice\\\\Cross\\\\1-01 Genesis.mp3","size":9462128,"slots":true,"speed":691205,"user":"nick13fury"},{"bitrate":320,"file":"@@gmfwe\\\\MP3\\\\2-ELEKTRO\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":1264692,"user":"phoenek"},{"bitrate":320,"file":"@@kndbi\\\\Music\\\\M to tag\\\\Need For Speed OST\\\\Need For Speed - Undercover OST\\\\10 - Justice - Genesis.mp3","size":7860084,"slots":true,"speed":552783,"user":"Ubicq"},{"bitrate":320,"file":"@@fialt\\\\Music\\\\Agnostic Front\\\\Liberty & Justice For\\\\04 Genesis.mp3","size":3916531,"slots":true,"speed":271522,"user":"Luke1811"},{"bitrate":320,"file":"@@kqyuq\\\\Music\\\\Justice\\\\Woman Worldwide\\\\04 Genesis x Phantom (WWW).mp3","size":11407710,"slots":true,"speed":768122,"user":"jo_schmo@juno.net"},{"bitrate":320,"file":"@@yqnyg\\\\Artists\\\\Justice\\\\2007 - Cross\\\\01 Genesis.mp3","size":9465735,"slots":true,"speed":624122,"user":"Inope"},{"bitrate":320,"file":"@@tdmou\\\\shared music\\\\a\\\\agnostic front\\\\Liberty and Justice For... (1987)\\\\04 Genesis.mp3","size":3891711,"slots":true,"speed":256047,"user":"NoBrakes16"},{"bitrate":320,"file":"@@bvpzw\\\\Albums Folder\\\\Agnostic Front - Liberty & Justice For\\\\Genesis.mp3","size":4006195,"slots":true,"speed":262540,"user":"blackmagicks"},{"bitrate":320,"file":"@@vbhks\\\\# Music\\\\# Albums\\\\# Rock\\\\# Punk\\\\# Hardcore\\\\# Hardcore\\\\Agnostic Front\\\\Liberty & Justice for\\\\Genesis.mp3","size":4145538,"slots":true,"speed":270100,"user":"guerradactyl"},{"bitrate":320,"file":"@@xisek\\\\Listening\\\\Keepers\\\\Agnostic Front - (1987) Liberty & Justice For\\\\Agnostic Front - (1987) Liberty & Justice For... - 0411 - Genesis.mp3","size":4070474,"slots":true,"speed":262424,"user":"batsinthebelfry"},{"bitrate":320,"file":"@@absyj\\\\musiikki\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":606524,"user":"Werdo"},{"bitrate":320,"file":"@@nvkjx\\\\EDM\\\\House\\\\Justice\\\\(2007) Cross\\\\Justice - Cross - 01 - Genesis.mp3","size":9404167,"slots":true,"speed":600305,"user":"Datasmurf"},{"bitrate":320,"file":"@@jkxyq\\\\Music\\\\Justice\\\\A Cross The Universe\\\\02 Genesis (Live Version).mp3","size":17604608,"slots":true,"speed":1064403,"user":"Bilouhoesman"},{"bitrate":320,"file":"@@eovlj\\\\MMusik\\\\Justice - Woman Worldwide\\\\04 - Genesis X Phantom.mp3","size":11409208,"slots":true,"speed":689800,"user":"stollentroll"},{"bitrate":320,"file":"@@rtsjd\\\\Music\\\\Fix Up, Look Sharp\\\\Step Up 3D\\\\Dizzee Rascal(Feat. Justice & Genesis) - Fix up, Look Sharp.mp3","size":8528322,"slots":true,"speed":510588,"user":"Jailyl"},{"bitrate":320,"file":"\\\\Users\\\\Flauzino\\\\Music\\\\iTunes\\\\iTunes Media\\\\Music\\\\Justice\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17780597,"slots":true,"speed":1043165,"user":"slowseeker"},{"bitrate":320,"file":"@@nthvt\\\\_electropop_house\\\\Justice\\\\2007 - † (Cross)\\\\01 Genesis.mp3","size":9429460,"slots":true,"speed":545269,"user":"ki55a55"},{"bitrate":320,"file":"@@fbzgd\\\\Music\\\\Justice\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":516493,"user":"cm398"},{"bitrate":320,"file":"@@uywuy\\\\Organized Music\\\\Justice\\\\† (Cross)\\\\01 Genesis.mp3","size":9431178,"slots":true,"speed":512417,"user":"Booozumz"},{"bitrate":320,"file":"@@kjadl\\\\Music\\\\Justice\\\\Cross\\\\01 Genesis.mp3","size":9392678,"slots":true,"speed":507678,"user":"ijey"},{"bitrate":320,"file":"@@gwbjg\\\\[G][DL]Music\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":507634,"user":"wenzelweck"},{"bitrate":320,"file":"@@pihrd\\\\MP3\\\\_Archive\\\\_Blind Test Os à Moelle 2019_01_29\\\\Levi's\\\\Justice - Genesis.mp3","size":7859904,"slots":true,"speed":416604,"user":"domdomdom822"},{"bitrate":320,"file":"@@pihrd\\\\Soulseek Save\\\\10 - Justice - Genesis.mp3","size":7859904,"slots":true,"speed":416604,"user":"domdomdom822"},{"bitrate":320,"file":"@@rtsjd\\\\Music\\\\Justice\\\\Step Up 3D\\\\Justice - Genesis.mp3","size":9694268,"slots":true,"speed":510588,"user":"Jailyl"},{"bitrate":320,"file":"@@iyola\\\\complete\\\\Justice - †\\\\01 Genesis.mp3","size":9451832,"slots":true,"speed":497172,"user":"Doku"},{"bitrate":320,"file":"@@qnxpn\\\\Music\\\\Justice\\\\[2007] †\\\\Justice - 01 - Genesis.mp3","size":9440903,"slots":true,"speed":492088,"user":"iamwearingpants"},{"bitrate":320,"file":"@@hnrjw\\\\Music Collection 320kbps HQ Tagged\\\\Justice - Genesis.mp3","size":9477673,"slots":true,"speed":477652,"user":"Smanio"},{"bitrate":320,"file":"@@dxprr\\\\Musique\\\\Justice\\\\Cross\\\\01 Genesis.mp3","size":9394216,"slots":true,"speed":473172,"user":"narg98"},{"bitrate":320,"file":"C:\\\\Music\\\\Justice\\\\Cross\\\\Genesis.mp3","size":9525112,"slots":true,"speed":476614,"user":"nightporter"},{"bitrate":320,"file":"@@zqzoj\\\\Main\\\\Justice\\\\Woman Worldwide\\\\04. Genesis x Phantom (WWW).mp3","size":11610188,"slots":true,"speed":545121,"user":"SamTurret120"},{"bitrate":320,"file":"@@xfzcn\\\\0-All Music\\\\1-AlbumsByArtist\\\\Justice\\\\Justice - Cross\\\\01 Genesis.mp3","size":9392777,"slots":true,"speed":426541,"user":"advancedbobo"},{"bitrate":320,"file":"@@harox\\\\Caras Galadhon\\\\pop\\\\Justice\\\\Cross\\\\Genesis - Justice.mp3","size":9448302,"slots":true,"speed":425457,"user":"pzan"},{"bitrate":320,"file":"@@kxhwg\\\\Iregal Music Redux\\\\Justice\\\\†\\\\Justice - 01 - Genesis.mp3","size":9440903,"slots":true,"speed":420699,"user":"Shpam"},{"bitrate":320,"file":"@@ejugj\\\\Music\\\\Justice\\\\2007 Cross\\\\101 - Genesis.mp3","size":9797044,"slots":true,"speed":424735,"user":"zecho"},{"bitrate":320,"file":"@@idrrs\\\\Archive\\\\Justice\\\\[2007] †\\\\1-01 Genesis.mp3","size":9468042,"slots":true,"speed":402232,"user":"ImmersionRoom"},{"bitrate":320,"file":"@@ezaxn\\\\Muzzik\\\\Rock & Tronic\\\\Justice\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":391946,"user":"Dr. Tobogan"},{"bitrate":320,"file":"@@vcwuj\\\\Dj Music\\\\Nu Disco\\\\Justice\\\\Justice - Genesis (Chewy Chocolate Cookies rmx).mp3","size":6516417,"slots":true,"speed":266276,"user":"tribbtown"},{"bitrate":320,"file":"@@qkkpd\\\\Music\\\\Justice (France)\\\\Justice - Access All Arenas (2013) [MP3 320]\\\\01 - Genesis.mp3","size":18675640,"slots":true,"speed":755331,"user":"ikigaii"},{"bitrate":320,"file":"@@ttywe\\\\Share\\\\2018-08\\\\justice - Woman Worldwide (2018) [320]\\\\04. Genesis x Phantom (WWW).mp3","size":11613218,"slots":true,"speed":465621,"user":"aadkenn2"},{"bitrate":320,"file":"@@hnrjw\\\\Music Collection 320kbps HQ Tagged\\\\Justice - Genesis x Phantom (WWW).mp3","size":12201942,"slots":true,"speed":477652,"user":"Smanio"},{"bitrate":320,"file":"@@ueoal\\\\iTunes Media\\\\Music\\\\Justice\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17674903,"slots":true,"speed":691205,"user":"nick13fury"},{"bitrate":320,"file":"@@qeojc\\\\Music\\\\Justice\\\\Cross\\\\1-01 Genesis.mp3","size":9462128,"slots":true,"speed":369857,"user":"Walruse"},{"bitrate":320,"file":"@@pyvjp\\\\complete\\\\justice - Woman Worldwide\\\\04 Genesis x Phantom (WWW).mp3","size":11613090,"slots":true,"speed":451636,"user":"signaljam"},{"bitrate":320,"file":"@@zizxz\\\\SS\\\\!!House\\\\House Dancefloor (2019)\\\\080. Justice - Genesis.mp3","size":9503790,"slots":true,"speed":367852,"user":"MWBP o(^-^)o"},{"bitrate":320,"file":"@@kmhco\\\\All\\\\Justice\\\\Access All Arenas\\\\01. Justice - Intro  Genesis x Civilization.mp3","size":21906712,"slots":true,"speed":839079,"user":"JusticeJill"},{"bitrate":320,"file":"D:\\\\musica\\\\Un puto kaos\\\\PUNK\\\\Punk, Oi, Ska, HC USA & Canada\\\\hardcore, posthardcore, metalcore\\\\AGNOSTIC FRONT\\\\[1987] Liberty & Justice For\\\\04 - Genesis.mp3","size":4014150,"slots":true,"speed":151612,"user":"BotesdeHumo!"},{"bitrate":320,"file":"@@jdaxh\\\\música\\\\Sugawuga's_Renaissance_II\\\\Sugawuga's Renaissance II\\\\12 Justice - Genesis.mp3","size":9444222,"slots":true,"speed":352616,"user":"sugrrrl"},{"bitrate":320,"file":"@@jzdva\\\\# min musik\\\\2018, 09\\\\Justice\\\\Woman Worldwide [Live] (2017)\\\\04 - Justice - Genesis X Phantom.mp3","size":11405348,"slots":true,"speed":419690,"user":"jamon1234"},{"bitrate":320,"file":"@@zhhcb\\\\Music\\\\†\\\\Justice - 01 - Genesis.mp3","size":9440903,"slots":true,"speed":330892,"user":"Techregon"},{"bitrate":320,"file":"@@absyj\\\\musiikki\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":606524,"user":"Werdo"},{"bitrate":320,"file":"@@dyxcl\\\\Music\\\\Other Music\\\\Space Jam\\\\Come On And Slam (Space Jam Mashups)\\\\Disc 1\\\\001 - Slam Genesis (Quad City DJ's vs. Justice) [Unpitched Intro].mp3","size":7684233,"slots":true,"speed":264048,"user":"fuckimsotired"},{"bitrate":320,"file":"@@nvkjx\\\\EDM\\\\House\\\\Justice\\\\(2008) A Cross The Universe\\\\CD 2; Live in San Francisco\\\\Justice - A Cross The Universe - CD 2; Live In San Francisco - 02 - Genesis.mp3","size":17604741,"slots":true,"speed":600305,"user":"Datasmurf"},{"bitrate":320,"file":"@@qjqdq\\\\Musica\\\\justice - A Cross The Universe\\\\02 Genesis.mp3","size":17603527,"slots":true,"speed":596654,"user":"kozi"},{"bitrate":320,"file":"@@alfzo\\\\MY MUSIC\\\\J\\\\Justice\\\\2008 - A Cross The Universe\\\\02 genesis.mp3","size":17603655,"slots":true,"speed":567477,"user":"thesnuffpunk"},{"bitrate":320,"file":"@@hbdjw\\\\Music\\\\4. Electronic\\\\Justice\\\\(2018) - Woman Worldwide\\\\04 - Genesis x Phantom (WWW).mp3","size":11408880,"slots":true,"speed":360096,"user":"x-soldierside-x"},{"bitrate":320,"file":"@@qjqdq\\\\Musica\\\\justice - Access All Arenas\\\\01 Genesis.mp3","size":18978535,"slots":true,"speed":596654,"user":"kozi"},{"bitrate":320,"file":"@@adjjg\\\\Music\\\\Electronic\\\\French House\\\\Justice - † (Cross) (2007)\\\\Justice - Genesis.mp3","size":9474650,"slots":true,"speed":290397,"user":"Vudkrein"},{"bitrate":320,"file":"@@jvlrz\\\\xxx\\\\A\\\\Agnostic Front\\\\Agnostic Front - 1987 - Liberty & Justice For...  (1999, Germany re-issue)\\\\04. Genesis.mp3","size":4014150,"slots":true,"speed":119579,"user":"t_steeler"},{"bitrate":320,"file":"@@batuw\\\\Music\\\\Justice\\\\A Cross the Universe Disc 1\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":521911,"user":"IndiePink"},{"bitrate":320,"file":"@@kzmad\\\\Muziek\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":277838,"user":"Booyahw"},{"bitrate":320,"file":"@@fbzgd\\\\Music\\\\Justice\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":516493,"user":"cm398"},{"bitrate":320,"file":"@@jvlrz\\\\xxx\\\\A\\\\Agnostic Front\\\\Agnostic Front - 1991 - Cause For Alarm, Liberty And Justice For\\\\14. Genesis.mp3","size":4078294,"slots":true,"speed":119579,"user":"t_steeler"},{"bitrate":320,"file":"@@kjadl\\\\Music\\\\Justice\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603527,"slots":true,"speed":507678,"user":"ijey"},{"bitrate":320,"file":"@@gwbjg\\\\[G][DL]Music\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":507634,"user":"wenzelweck"},{"bitrate":320,"file":"@@khbpc\\\\Music Game\\\\Videogame Music\\\\Need For Speed (Unofficial Collector's Edition Soundtrack) (2013)\\\\23. Need for Speed - Undercover (2008)\\\\10. Justice - Genesis.mp3","size":9353296,"slots":true,"speed":266582,"user":"Mole"},{"bitrate":320,"file":"@@fbzgd\\\\Music\\\\Justice\\\\Access All Arenas\\\\01 - Genesis.mp3","size":18675640,"slots":true,"speed":516493,"user":"cm398"},{"bitrate":320,"file":"@@svqga\\\\Music\\\\Justice - Genesis.mp3","size":9431980,"slots":true,"speed":256678,"user":"unrelatedname"},{"bitrate":320,"file":"@@qmtnb\\\\Music\\\\Justice\\\\†\\\\01 Genesis.mp3","size":9429460,"slots":true,"speed":249783,"user":"yaj"},{"bitrate":320,"file":"C:\\\\Users\\\\Brian\\\\Music\\\\Complete\\\\complete\\\\complete\\\\Cross\\\\01. Justice - Genesis.mp3","size":9182616,"slots":true,"speed":231106,"user":"FatWendal"},{"bitrate":320,"file":"@@qefxy\\\\Mp3\\\\Justice\\\\Justice - †  (Japanese) [2008]\\\\CD1\\\\01 - Justice - Genesis.mp3","size":9410785,"slots":true,"speed":214875,"user":"bishun"},{"bitrate":320,"file":"@@ekpbq\\\\Music\\\\step up\\\\OST Step Up 3D (2010)\\\\06 Dizzee Rascal Ft. Justice & Genesis - Fix Up, Look Sharp.mp3","size":8211897,"slots":true,"speed":186269,"user":"colbyking"},{"bitrate":320,"file":"@@ffetk\\\\Music\\\\Justice\\\\(2007) Cross\\\\01 Genesis.mp3","size":9952578,"slots":true,"speed":221759,"user":"roni"},{"bitrate":320,"file":"@@ezaxn\\\\Muzzik\\\\Rock & Tronic\\\\Justice\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":391946,"user":"Dr. Tobogan"},{"bitrate":320,"file":"@@aqyph\\\\MP3\\\\Justice\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17616771,"slots":true,"speed":388758,"user":"frantua"},{"bitrate":320,"file":"@@jmowb\\\\Música\\\\Justice\\\\Justice - Woman Worldwide (2018)\\\\04 Genesis x Phantom (WWW).mp3","size":12225148,"slots":true,"speed":268637,"user":"Ardefisty"},{"bitrate":320,"file":"@@ohgvt\\\\Music\\\\Justice\\\\J-AAA\\\\01 Genesis.mp3","size":18677880,"slots":true,"speed":406375,"user":"Z_Man1209"},{"bitrate":320,"file":"@@hxkhj\\\\Музыка\\\\Justice - 2018 - Woman Worldwide\\\\04 - Justice - Genesis x Phantom.mp3","size":11611245,"slots":true,"speed":249004,"user":"yurapech"},{"bitrate":320,"file":"@@lbqvf\\\\Musique\\\\Rock\\\\agnostic front\\\\1987- liberty & justice for\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":76967,"user":"nomadbak"},{"bitrate":320,"file":"@@rknrd\\\\Music\\\\Justice\\\\Woman Worldwide (2018)\\\\Justice - Woman Worldwide - 04 - Genesis × Phantom.mp3","size":11611245,"slots":true,"speed":226919,"user":"Darknight710"},{"bitrate":320,"file":"@@otpov\\\\Music\\\\Justice - A Cross The Universe\\\\02 - Genesis.mp3","size":17640207,"slots":true,"speed":344435,"user":"cannibalholocaust"},{"bitrate":320,"file":"@@qwsgn\\\\Musique\\\\Punk\\\\Agnostic Front\\\\Liberty and Justice For... (1987)\\\\04 Genesis.mp3","size":3891711,"slots":true,"speed":73830,"user":"454kasull"},{"bitrate":320,"file":"@@nlbqv\\\\Music\\\\VA - Games and Movies Theme Songs\\\\DJ Hero Original Soundtrack (320)\\\\Public Enemy feat. Zakk Wylde vs. Justice - Bring Tha Noise 20XX vs. Genesis.mp3","size":8264929,"slots":true,"speed":154005,"user":"e-flavio"},{"bitrate":320,"file":"@@nlbqv\\\\Music\\\\VA - Games and Movies Theme Songs\\\\DJ Hero Original Soundtrack (320)\\\\Dizzee Rascal vs. Justice - Fix Up, Look Sharp vs. Genesis.mp3","size":8306621,"slots":true,"speed":154005,"user":"e-flavio"},{"bitrate":320,"file":"D:\\\\Música\\\\AGNOSTIC FRONT - DISCOGRAPHY (1983-11) [CHANNEL NEO]\\\\[1987] Liberty & Justice For\\\\04 - Genesis.mp3","size":4014150,"slots":true,"speed":73541,"user":"DNKS"},{"bitrate":320,"file":"@@adjjg\\\\Music\\\\Electronic\\\\French House\\\\Justice - A Cross The Universe (2008)\\\\02 Genesis.mp3","size":17646128,"slots":true,"speed":290397,"user":"Vudkrein"},{"bitrate":320,"file":"@@ibubm\\\\Musique\\\\Artistes\\\\Justice\\\\Justice LIVE\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":280545,"user":"gnole"},{"bitrate":320,"file":"@@bwktx\\\\ANA BOLENA\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9540160,"slots":true,"speed":151994,"user":"fuoqui"},{"bitrate":320,"file":"f:\\\\music\\\\international music\\\\justice\\\\(2008.11.24) [live] justice - a cross the universe\\\\02 Genesis.mp3","size":17674923,"slots":true,"speed":280073,"user":"Zakyamuni"},{"bitrate":320,"file":"@@kzmad\\\\Muziek\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":277838,"user":"Booyahw"},{"bitrate":320,"file":"@@sqlsi\\\\Music\\\\Agnostic Front (1987) Liberty & Justice For\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":59371,"user":"stripofil"},{"bitrate":320,"file":"@@duckn\\\\MUSIC COLLECTION\\\\Justice\\\\Woman Worldwide\\\\04 - Genesis x Phantom.mp3","size":11514955,"slots":true,"speed":159300,"user":"darkstar13"},{"bitrate":320,"file":"@@xjppx\\\\Albums\\\\Justice\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":130597,"user":"Anchoret-thinkpad"},{"bitrate":320,"file":"@@xrysu\\\\Justice\\\\justice - cross\\\\01. genesis.mp3","size":9443466,"slots":true,"speed":129218,"user":"mutantoide"},{"bitrate":320,"file":"Z:\\\\disk1\\\\Datas\\\\Musique\\\\3 - Electronic\\\\Justice\\\\justice\\\\02 - Justice - Genesis.mp3","size":17622942,"slots":true,"speed":214716,"user":"Herondil"},{"bitrate":320,"file":"@@rzzgq\\\\Live Set Collections\\\\Trance House Tech\\\\MixMag Cover CDs\\\\2008 Mixmag Cover CD Collection\\\\Mixmag - Simian Mobile Disco\\\\07 Justice - Genesis.mp3","size":10772296,"slots":true,"speed":129523,"user":"lasedimotu"},{"bitrate":320,"file":"e:\\\\itunes\\\\itunes media\\\\music\\\\justice\\\\cross\\\\01 Genesis.mp3","size":9426635,"slots":true,"speed":113184,"user":"SharonCox"},{"bitrate":320,"file":"@@uqfjk\\\\Music\\\\360\\\\Please Be Seated 2\\\\03 Genesis _ 360 Ft Justice x Justice.mp3","size":7567268,"slots":true,"speed":87358,"user":"kaczing"},{"bitrate":320,"file":"@@wxuss\\\\MUSIC\\\\ELECTRONIC]A[\\\\JUSTICE\\\\Justice - 2018 - Woman Worldwide\\\\04 - Justice - Genesis x Phantom.mp3","size":11611245,"slots":true,"speed":126590,"user":"christgrinder"},{"bitrate":320,"file":"@@gphet\\\\Music\\\\Justice - Cross (2007)\\\\01. Justice - Genesis.mp3","size":9462128,"slots":true,"speed":98296,"user":"bobopuppyhead_666"},{"bitrate":320,"file":"@@zddwc\\\\MUSICA\\\\HOUSE\\\\ELECTRO HOUSE\\\\Genesis - Justice.mp3","size":9436113,"slots":true,"speed":92076,"user":"gionamameli"},{"bitrate":320,"file":"F:\\\\MP3\\\\Justice - genesis.mp3","size":9450067,"slots":true,"speed":91612,"user":"FUNKTIONS"},{"bitrate":320,"file":"@@uqfjk\\\\Music\\\\Justice\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":87358,"user":"kaczing"},{"bitrate":320,"file":"@@nlbqv\\\\Music\\\\Justice\\\\Justice - A Cross the Universe (2008) film\\\\02 Genesis.mp3","size":17624996,"slots":true,"speed":154005,"user":"e-flavio"},{"bitrate":320,"file":"@@bwktx\\\\ANA BOLENA\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17637750,"slots":true,"speed":151994,"user":"fuoqui"},{"bitrate":320,"file":"@@gkljj\\\\soulseek-downloads\\\\ADDED TO HDD\\\\Dance - Multiple Genres\\\\Justice - Genesis (Lady Waks Radio Edit) (Slightly More Up-Tempo).mp3","size":8987264,"slots":true,"speed":73605,"user":"BJBigO"},{"bitrate":320,"file":"@@gkljj\\\\soulseek-downloads\\\\HOUSE - ALL\\\\Justice - Genesis (Lady Waks Radio Edit) (BigO Up-Tempo)     AWESOME AWESOME!!...chunky & cool.mp3","size":8987264,"slots":true,"speed":73605,"user":"BJBigO"},{"bitrate":320,"file":"@@llyty\\\\MUSIC\\\\last.fm tunes\\\\Justice - †\\\\Justice - 01 - Genesis.mp3","size":9441031,"slots":true,"speed":74784,"user":"chodi"},{"bitrate":320,"file":"d:\\\\''tes idoles''\\\\music\\\\collection\\\\compilation [various artists]\\\\volume  2\\\\Justice-Genesis  ''� (CROSS)''  2007.mp3","size":9433472,"slots":true,"speed":70958,"user":"Till"},{"bitrate":320,"file":"@@wxuss\\\\MUSIC\\\\ELECTRONIC]A[\\\\JUSTICE\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":126590,"user":"christgrinder"},{"bitrate":320,"file":"@@dbxki\\\\Music\\\\†\\\\Justice - 01 - Genesis.mp3","size":9440903,"slots":true,"speed":61297,"user":"KillahMove"},{"bitrate":320,"file":"@@ogcpa\\\\Musique\\\\Electro\\\\Artistes\\\\Justice\\\\Remix\\\\Justice - Genesis (Chewy Chocolate Cookies remix).mp3","size":8999813,"slots":true,"speed":58289,"user":"Jack_Le_Master"},{"bitrate":320,"file":"@@ogcpa\\\\Musique\\\\Electro\\\\Artistes\\\\Justice\\\\Justice - Genesis.mp3","size":9367617,"slots":true,"speed":58289,"user":"Jack_Le_Master"},{"bitrate":320,"file":"Y:\\\\DJ Set\\\\Nacho\\\\201310\\\\Justice - Genesis.mp3","size":9631323,"slots":true,"speed":59792,"user":"supernacho"},{"bitrate":320,"file":"e:\\\\zene\\\\a cross the universe (ed banger 2008)\\\\02 - justice - genesis.mp3","size":17618846,"slots":true,"speed":104031,"user":"sooooos"},{"bitrate":320,"file":"@@rdcro\\\\Electro\\\\Justice - Genesis (Go Go Bizkitt! Remix!).mp3","size":12150650,"slots":true,"speed":70104,"user":"audioerror"},{"bitrate":320,"file":"@@lqtaf\\\\Albums\\\\Justice - Across the Universe\\\\02 Genesis.mp3","size":18115729,"slots":true,"speed":96070,"user":"Thisissimp"},{"bitrate":320,"file":"@@sfcog\\\\Musica\\\\Justice - Cross\\\\(01) [Justice] Genesis.mp3","size":9404308,"slots":true,"speed":48916,"user":"iccanobif"},{"bitrate":320,"file":"@@uqfjk\\\\Music\\\\Justice\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":87358,"user":"kaczing"},{"bitrate":320,"file":"@@lpxyd\\\\- - - - - mp3\\\\VARIOS - ELECTRO\\\\Justice\\\\Various Remixes\\\\Genesis (Menowah Remix).mp3","size":7078225,"slots":true,"speed":34855,"user":"ruim80"},{"bitrate":320,"file":"@@ogcpa\\\\Musique\\\\Electro\\\\Artistes\\\\Justice\\\\Remix\\\\Justice - Genesis (Go Go Bizkitt! remix).mp3","size":12019568,"slots":true,"speed":58289,"user":"Jack_Le_Master"},{"bitrate":320,"file":"@@nzbts\\\\zoop\\\\Justice\\\\2007 ~ ✝\\\\01 Genesis.mp3","size":9459638,"slots":true,"speed":40652,"user":"marsellus"},{"bitrate":320,"file":"@@ogcpa\\\\Musique\\\\Electro\\\\Artistes\\\\Justice\\\\Remix\\\\Justice - Genesis (Access All Arenas live version).mp3","size":15495944,"slots":true,"speed":58289,"user":"Jack_Le_Master"},{"bitrate":320,"file":"@@lpxyd\\\\- - - - - mp3\\\\Justice - Woman Worldwide\\\\04 - Genesis X Phantom (Www).mp3","size":12202070,"slots":true,"speed":34855,"user":"ruim80"},{"bitrate":320,"file":"@@kfsyp\\\\music\\\\justice - cross\\\\justice - genesis.mp3","size":9505658,"slots":true,"speed":13856,"user":"JeanDeJeton"},{"bitrate":320,"file":"@@lrfkq\\\\Music\\\\Justice\\\\†\\\\01 Genesis.mp3","size":9427112,"slots":true,"speed":13659,"user":"Valery_Kondakoff"},{"bitrate":320,"file":"@@azmzb\\\\Music\\\\Albums\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":0,"user":"CookieJar"},{"bitrate":320,"file":"@@azmzb\\\\Music\\\\Albums\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":0,"user":"CookieJar"},{"bitrate":320,"file":"@@azmzb\\\\Music\\\\Anhedonia\\\\06 Dizzee Rascal Ft. Justice & Genesis - Fix Up, Look Sharp.mp3","size":8211897,"slots":true,"speed":0,"user":"CookieJar"},{"bitrate":320,"file":"@@fksxk\\\\Music\\\\Slsk\\\\complete\\\\Justice - Cross [2007]\\\\01 - Genesis.mp3","size":9438295,"slots":true,"speed":0,"user":"probablyrobb"},{"bitrate":320,"file":"@@tantp\\\\Sharing\\\\CHUNITHM ALL JUSTICE COLLECTION ep. I [MP3]\\\\2-09. Genesis.mp3","size":5038816,"slots":true,"speed":0,"user":"Myrkul"},{"bitrate":320,"file":"@@plnit\\\\Music\\\\Justice - Cross (2007) [Temique.blogspot.com]\\\\01 Genesis.mp3","size":9468042,"slots":true,"speed":0,"user":"Spirono"},{"bitrate":320,"file":"@@yqndk\\\\Music\\\\need to organize\\\\Justice Discography\\\\A Cross The Universe\\\\02 Genesis.mp3","size":17603655,"slots":true,"speed":0,"user":"vadaa"},{"bitrate":320,"file":"@@yqndk\\\\Music\\\\need to organize\\\\Justice Discography\\\\†\\\\1-01 Genesis.mp3","size":9459638,"slots":true,"speed":0,"user":"vadaa"},{"bitrate":320,"file":"@@vvgzl\\\\Music\\\\Agnostic Front\\\\1987- Liberty & Justice For\\\\04 Genesis.mp3","size":3888160,"slots":true,"speed":0,"user":"Fugu"}]`

const getSortedSearchResults = ({
  searchResults,
  fileExtensions,
  hasOnlyHighBitrate
}) => {
  const filteredByExtension = searchResults
    .filter(r => {
      return fileExtensions.includes(searchResultUtils.getFileExtension(r))
    })

  if (!hasOnlyHighBitrate) {
    return filteredByExtension
  }

  return filteredByExtension.filter(r => {
    const fileExtension = searchResultUtils.getFileExtension(r)

    if (fileExtension !== AudioFileExtension.MP3) {
      return true
    }

    const bitrate = searchResultUtils.getBitrate(r)

    if (!bitrate) {
      return false
    }

    return bitrate === 320
  })
}

class SearchView extends React.Component {
  constructor (props) {
    super(props)

    const fileExtensions = props.settings.get('searchFileExtensions')
    const hasOnlyHighBitrate = props.settings.get('searchHasOnlyHighBitrate')

    const searchResults = process.env.NODE_ENV === 'development' ? getSortedSearchResults({
      searchResults: JSON.parse(DEV_SEARCH_RESULTS),
      fileExtensions,
      hasOnlyHighBitrate
    }) : []

    this.state = {
      isSearching: false,
      searchResults,
      downloads: []
    }
  }

  componentWillUnmount () {
    ipcRenderer.removeAllListeners(Channel.DOWNLOAD_PROGRESS)
    ipcRenderer.removeAllListeners(Channel.DOWNLOAD_ERROR)
  }

  componentDidMount () {
    ipcRenderer.on(Channel.DOWNLOAD_PROGRESS, (event, {
      file,
      progress
    }) => {
      this.setState({
        downloads: this.state.downloads.map(i => {
          return i.track.file === file ? {
            ...i,
            progress
          } : i
        })
      })
    })

    ipcRenderer.on(Channel.DOWNLOAD_ERROR, (event, {
      file,
      errorMessage
    }) => {
      this.setState({
        downloads: this.state.downloads.map(i => {
          return i.track.file === file ? {
            ...i,
            hasError: true,
            errorMessage
          } : i
        })
      })
    })
  }

  handleSearchSubmit = async ({ query }) => {
    const { settings } = this.props

    this.setState({
      isSearching: true
    })

    const res = await search({ query })

    this.setState({
      isSearching: false,
      searchResults: getSortedSearchResults({
        fileExtensions: settings.get('searchFileExtensions'),
        hasOnlyHighBitrate: settings.get('searchHasOnlyHighBitrate'),
        searchResults: res.results
      })
    })
  }

  handleSearchResultClick = ({ track, name }) => {
    return async () => {
      const { downloads } = this.state

      downloads.push({
        track,
        name,
        isDownloaded: false,
        isDownloading: true
      })

      this.setState({
        downloads
      })

      try {
        const {
          downloadPath
        } = await download({
          track,
          name
        })

        this.setState({
          downloads: downloads.map(i => {
            return i.track.file === track.file ? {
              ...i,
              isDownloaded: true,
              isDownloading: false,
              downloadPath
            } : i
          })
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  renderSearchResults = () => {
    const {
      isSearching,
      searchResults,
      downloads
    } = this.state

    if (isSearching) {
      return (
        <div className={styles.searchResultsLoader}>
          <Spinner primary />
        </div>
      )
    }

    if (searchResults.length === 0) {
      return (
        <div className={styles.searchResultsEmpty}>
          No results.
        </div>
      )
    }

    return (
      <div className={styles.searchResults}>
        {searchResults.map((track) => {
          const download = downloads.find(d => {
            return d.track.file === track.file
          }) || {}

          return (
            <SearchResult
              key={track.file}
              track={track}
              download={download}
              onDownloadClick={this.handleSearchResultClick({
                track,
                name: searchResultUtils.getFileName(track, true)
              })} />
          )
        })}
      </div>
    )
  }

  render () {
    return (
      <div className={styles.component}>
        <div className={styles.header}>
          <div className={styles.search}>
            <SearchForm onSubmit={this.handleSearchSubmit} />
          </div>
        </div>
        {this.renderSearchResults()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    settings: getData(state)
  }
}

const mapActionsToProps = null

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchView)
