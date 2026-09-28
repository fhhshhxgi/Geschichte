import { AfricanTerritory } from './africaMapData';

export const AFRICA_TERRITORIES: AfricanTerritory[] = [
  // 1. ÄGYPTEN
  {
    id: 'egypt',
    name: 'Ägypten & Sinai',
    region: 'north',
    center: [680, 240],
    path: 'M 600,165 L 740,165 L 755,200 L 760,280 L 670,305 L 610,305 L 600,220 Z',
    statusByYear: {
      1880: {
        power: 'ottoman',
        title: 'Khedivat Ägypten (Osmanische Oberhoheit)',
        subtext: 'Formal osmanisch, aber durch Staatsschulden am Bau des Sueskanals zunehmend unter britisch-französischer Finanzkontrolle.',
        indigenousRule: 'Khedive Tawfiq (Muhammad-Ali-Dynastie)',
        keyResources: ['Baumwolle', 'Sueskanal-Zölle']
      },
      1885: {
        power: 'britain',
        title: 'Britisch besetztes Khedivat Ägypten',
        subtext: 'Nach der Niederschlagung der Urabi-Bewegung 1882 besetzte Großbritannien Ägypten militärisch zur Sicherung des Sueskanals.',
        indigenousRule: 'Khedive als formales Staatsoberhaupt unter britischem Generalkonsul Evelyn Baring (Lord Cromer)',
        keyResources: ['Sueskanal', 'Langstapelige Baumwolle']
      },
      1895: {
        power: 'britain',
        title: 'Verschleiertes Protektorat („Veiled Protectorate“)',
        subtext: 'Großbritannien kontrolliert Verwaltung, Finanzen und Armee vollständig, um die Seeroute nach Britisch-Indien abzusichern.',
        indigenousRule: 'Marionetten-Khedivat unter Lord Cromer',
        keyResources: ['Baumwolle', 'Handelsrouten']
      },
      1900: {
        power: 'britain',
        title: 'Britische Schlüsselstellung im Niltal',
        subtext: 'Ausgangspunkt für Kitcheners Feldzug zur Rückeroberung des Sudan.',
        indigenousRule: 'Britische Kontrollverwaltung',
        keyResources: ['Baumwolle', 'Schifffahrtswege']
      },
      1914: {
        power: 'britain',
        title: 'Offizielles Sultanat Ägypten (Britisches Protektorat)',
        subtext: 'Bei Kriegsausbruch gegen das Osmanische Reich erklärt London Ägypten offiziell zum britischen Protektorat.',
        indigenousRule: 'Sultan Hussein Kamel unter britischem Hochkommissar',
        keyResources: ['Sueskanal', 'Kriegslogistik']
      }
    }
  },

  // 2. SUDAN
  {
    id: 'sudan',
    name: 'Sudan & Nubien',
    region: 'north',
    center: [640, 360],
    path: 'M 605,305 L 670,305 L 750,285 L 730,410 L 680,450 L 590,430 L 585,340 Z',
    statusByYear: {
      1880: {
        power: 'ottoman',
        title: 'Turko-Ägyptischer Sudan',
        subtext: 'Unter drückender ägyptisch-osmanischer Steuerherrschaft; verbreitete Unzufriedenheit in der Bevölkerung.',
        indigenousRule: 'Ägyptische Paschas & britische Söldnergouverneure (z. B. Gordon Pascha)',
        keyResources: ['Elfenbein', 'Gummi arabicum', 'Viehzucht']
      },
      1885: {
        power: 'independent',
        title: 'Unabhängiger Mahdi-Staat',
        subtext: 'Muhammad Ahmad rief den heiligen Krieg aus; Einnahme von Khartum im Januar 1885, General Gordon fiel. Der Sudan befreite sich!',
        indigenousRule: 'Muhammad Ahmad al-Mahdi & Khalifa Abdallahi',
        keyResources: ['Gummi arabicum', 'Traditioneller Karawanenhandel'],
        resistanceEvent: 'Einnahme von Khartum & Tod General Gordons (Januar 1885)'
      },
      1895: {
        power: 'independent',
        title: 'Souveränes Kalifat von Omdurman',
        subtext: 'Über ein Jahrzehnt erfolgreiche Verteidigung der Unabhängigkeit gegen britische, ägyptische und italienische Angriffe.',
        indigenousRule: 'Khalifa Abdallahi ibn Muhammad',
        keyResources: ['Traditionelle Landwirtschaft', 'Elfenbein']
      },
      1900: {
        power: 'britain',
        title: 'Anglo-Ägyptischer Sudan (Kondominium)',
        subtext: 'Nach der Schlacht von Omdurman (1898), bei der britische Maxim-Guns 11.000 Sudanesen niedermähten, erobert.',
        indigenousRule: 'Britisches Militärgouvernement (Lord Kitchener)',
        keyResources: ['Gummi arabicum', 'Gezira-Baumwollanbau'],
        resistanceEvent: 'Schlacht von Omdurman 1898: Massaker durch britische Maschinengewehre'
      },
      1914: {
        power: 'britain',
        title: 'Anglo-Ägyptischer Sudan',
        subtext: 'Fester Bestandteil der britischen „Kap-Kairo-Achse“.',
        indigenousRule: 'Britisches Generalgouvernement',
        keyResources: ['Baumwolle', 'Nilkontrolle']
      }
    }
  },

  // 3. LIBYEN
  {
    id: 'libya',
    name: 'Libyen (Tripolitanien & Kyrenaika)',
    region: 'north',
    center: [520, 240],
    path: 'M 460,175 L 595,165 L 605,305 L 540,335 L 465,305 L 450,210 Z',
    statusByYear: {
      1880: {
        power: 'ottoman',
        title: 'Osmanische Vilayets Tripolitanien & Bengasi',
        subtext: 'Direkte osmanische Provinzverwaltung; eng verknüpft mit dem Sanussiya-Sufi-Orden.',
        indigenousRule: 'Osmanische Gouverneure & Sanussiya-Orden',
        keyResources: ['Transsahara-Handelsrouten', 'Oasenlandwirtschaft']
      },
      1885: {
        power: 'ottoman',
        title: 'Osmanische Provinz Tripolitanien',
        subtext: 'Said Pasha verteidigte auf der Berliner Konferenz die Souveränität, fand bei den Mächten jedoch kein Gehör.',
        indigenousRule: 'Osmanische Garnisonen & Beduinenstämme',
        keyResources: ['Handelsrouten']
      },
      1895: {
        power: 'ottoman',
        title: 'Osmanische Tripolitana',
        subtext: 'Italien begann im Rahmen diplomatischer Geheimabkommen, seinen Anspruch auf Libyen vorzubereiten.',
        indigenousRule: 'Osmanische Administration & Sanussiya',
        keyResources: ['Küstenhäfen']
      },
      1900: {
        power: 'ottoman',
        title: 'Letzte osmanische Bastion in Nordafrika',
        subtext: 'Frankreich und Großbritannien erkannten Italiens „Interessensphäre“ in Tripolitanien stillschweigend an.',
        indigenousRule: 'Osmanischer Vali',
        keyResources: ['Handel']
      },
      1914: {
        power: 'italy',
        title: 'Italienisch-Libyen (Besetzung ab 1911)',
        subtext: 'Im Italienisch-Türkischen Krieg 1911/12 annektiert; stieß auf jahrelangen erbitterten Guerillakrieg des Sanussiya-Ordens (Omar Mukhtar).',
        indigenousRule: 'Italienische Kolonialarmee & antikolonialer Widerstand von Omar Mukhtar',
        keyResources: ['Strategische Mittelmeerküste'],
        resistanceEvent: 'Beginn des 20-jährigen Sanussiya-Befreiungskriegs unter Omar Mukhtar'
      }
    }
  },

  // 4. TUNESIEN & ALGERIEN
  {
    id: 'algeria_tunisia',
    name: 'Algerien & Tunesien',
    region: 'north',
    center: [390, 205],
    path: 'M 290,200 L 450,165 L 460,240 L 410,290 L 320,290 L 290,240 Z',
    statusByYear: {
      1880: {
        power: 'france',
        title: 'Französisch-Algerien & Beylik Tunesien',
        subtext: 'Algerien seit 1830 mit brutaler Siedlerkolonisation unterworfen; Tunesien noch autonomes Beylik.',
        indigenousRule: 'Algerische Stämme entrechtet; Bey von Tunis (Muhammad III. as-Sadiq)',
        keyResources: ['Weinbau', 'Getreide', 'Phosphat']
      },
      1885: {
        power: 'france',
        title: 'Französische Kolonie Algerien & Protektorat Tunesien',
        subtext: 'Frankreich erzwang 1881 den Vertrag von Bardo und machte Tunesien zum Protektorat.',
        indigenousRule: 'Französisches Generalgouvernement & Marionetten-Bey',
        keyResources: ['Phosphate', 'Olivenöl', 'Eisenerz']
      },
      1895: {
        power: 'france',
        title: 'Siedlerkolonie Algerien („Départements français“)',
        subtext: 'Algerien wurde administrativ zu französischem Staatsgebiet erklärt; Algerier galten rechtlich als entrechtete Untertanen („Code de l’Indigénat“).',
        indigenousRule: 'Europäische Siedler-Minderheit („Pieds-Noirs“) herrscht absolut',
        keyResources: ['Phosphate', 'Agrargüter']
      },
      1900: {
        power: 'france',
        title: 'Französische Nordafrika-Achse',
        subtext: 'Verbindung der algerischen Stützpunkte mit Expeditionen nach Süden in die Sahara.',
        indigenousRule: 'Militärverwaltung der Sahara-Territorien',
        keyResources: ['Phosphate', 'Erze']
      },
      1914: {
        power: 'france',
        title: 'Französisch-Nordafrika',
        subtext: 'Vollständige Eingliederung in das französische Kolonialimperium; Rekrutierung zehntausender algerischer Soldaten für den 1. Weltkrieg.',
        indigenousRule: 'Französische Kolonialbehörden',
        keyResources: ['Truppenrekrutierung für europäische Fronten', 'Agrarprodukte']
      }
    }
  },

  // 5. MAROKKO
  {
    id: 'morocco',
    name: 'Sultanat Marokko',
    region: 'north',
    center: [250, 200],
    path: 'M 195,190 L 290,195 L 290,260 L 210,270 L 175,225 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Souveränes Alawiden-Sultanat Marokko',
        subtext: 'Unabhängiges Sultanat; Madrider Konferenz (1880) garantierte noch gleichen Handelszugang der Mächte.',
        indigenousRule: 'Sultan Mulai al-Hassan I.',
        keyResources: ['Handelshäfen', 'Leder', 'Agrar']
      },
      1885: {
        power: 'independent',
        title: 'Souveränes Sultanat Marokko',
        subtext: 'Konnte seine Unabhängigkeit durch geschicktes Taktieren zwischen London, Paris und Madrid wahren.',
        indigenousRule: 'Sultan Mulai al-Hassan I.',
        keyResources: ['Getreide', 'Kork']
      },
      1895: {
        power: 'independent',
        title: 'Unabhängiges Marokko unter Reformdruck',
        subtext: 'Europäische Mächte verlangten zunehmend Konzessionen und Schürfrechte.',
        indigenousRule: 'Sultan Abd al-Aziz',
        keyResources: ['Phosphate', 'Kupfer']
      },
      1900: {
        power: 'independent',
        title: 'Unabhängiges Sultanat Marokko',
        subtext: 'Ziel französischer imperialer Begierden; Auslöser der Ersten Marokkokrise 1905 (Besuch Wilhelms II. in Tanger).',
        indigenousRule: 'Sultan Abd al-Aziz',
        keyResources: ['Phosphate', 'Eisenerz']
      },
      1914: {
        power: 'france',
        title: 'Französisches & Spanisches Protektorat Marokko',
        subtext: 'Nach der Zweiten Marokkokrise 1911 (Panthersprung nach Agadir) zwang Frankreich dem Sultan 1912 den Vertrag von Fès auf.',
        indigenousRule: 'Sultan unter französischer Generalresidenz (General Lyautey)',
        keyResources: ['Phosphate', 'Atlantikhäfen'],
        resistanceEvent: 'Widerstand im Rif-Gebirge kündigt sich an (späterer Rifkrieg unter Abd al-Karim)'
      }
    }
  },

  // 6. WESTSAHARA / RÍO DE ORO
  {
    id: 'western_sahara',
    name: 'Westsahara (Río de Oro)',
    region: 'north',
    center: [160, 290],
    path: 'M 140,260 L 210,260 L 210,340 L 150,340 L 130,290 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Autonome Sahraui-Nomadengesellschaften',
        subtext: 'Unabhängige Beduinenstämme kontrollieren die atlantischen Karawanenrouten.',
        indigenousRule: 'Sahraui-Stammesräte (Djema’a)',
        keyResources: ['Küstengebiete', 'Fischerei']
      },
      1885: {
        power: 'spain',
        title: 'Spanisches Protektorat Río de Oro',
        subtext: 'Spanien proklamierte im Dezember 1884 ein Protektorat an der Küste, das auf der Berliner Konferenz anerkannt wurde.',
        indigenousRule: 'Spanische Handelsfaktorei in Villa Cisneros (Dakhla)',
        keyResources: ['Fischerei', 'Salz']
      },
      1895: {
        power: 'spain',
        title: 'Spanisch-Sahara',
        subtext: 'Spanische Präsenz blieb im Wesentlichen auf befestigte Küstenforts beschränkt.',
        indigenousRule: 'Nomadische Stämme im Binnenland faktisch autonom',
        keyResources: ['Küstenkontrolle']
      },
      1900: {
        power: 'spain',
        title: 'Spanisch-Sahara',
        subtext: 'Vertrag von Paris (1900) legte die Linealgrenzen zwischen Spanien und Frankreich fest.',
        indigenousRule: 'Spanische Kolonialbeamte in Küstenenklaven',
        keyResources: ['Küstensicherung']
      },
      1914: {
        power: 'spain',
        title: 'Spanisch-Westafrika (Río de Oro & Saguia el Hamra)',
        subtext: 'Formale spanische Kolonie mit schnurgeraden Wüstengrenzen.',
        indigenousRule: 'Spanische Kolonialverwaltung',
        keyResources: ['Fischerei', 'Spätere Phosphatvorkommen']
      }
    }
  },

  // 7. FRANZÖSISCH-WESTAFRIKA (SENEGAL, MALI, NIGER, MAURETANIEN)
  {
    id: 'french_west_africa',
    name: 'Französisch-Westafrika (AOF)',
    region: 'west',
    center: [280, 360],
    path: 'M 215,280 L 460,280 L 460,400 L 380,450 L 250,450 L 160,360 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Autonome Reiche Westafrikas (Toucouleur, Mossi, Wassoulou)',
        subtext: 'Frankreich kontrolliert nur vier Küstengemeinden im Senegal (Saint-Louis, Gorée, Dakar, Rufisque).',
        indigenousRule: 'Toucouleur-Reich (Ahmadu Tall), Wassoulou-Reich (Samory Touré), Mossi-Königreiche',
        keyResources: ['Erdnüsse', 'Gummi arabicum', 'Traditionelle Goldwäscherei']
      },
      1885: {
        power: 'france',
        title: 'Französische Militäroffensive in den Soudan',
        subtext: 'Frankreich stößt vom Senegal-Fluss zum oberen Niger vor und bekämpft afrikanische Reiche.',
        indigenousRule: 'Militärischer Widerstand unter Almamy Samory Touré & Lat Dior',
        keyResources: ['Erdnüsse', 'Militärstützpunkte']
      },
      1895: {
        power: 'france',
        title: 'Gründung von Französisch-Westafrika (AOF)',
        subtext: 'Offizielle Föderation der Kolonien Senegal, Französisch-Sudan, Guinea und Elfenbeinküste 1895.',
        indigenousRule: 'Zerschlagung der traditionellen Reiche nach Erbittertem Widerstand',
        keyResources: ['Erdnüsse', 'Baumwolle', 'Holz']
      },
      1900: {
        power: 'france',
        title: 'Französisch-Westafrika (AOF)',
        subtext: 'Gefangennahme von Samory Touré (1898); Einführung der brutalen Kopfsteuer („Hüttensteuer“) und Zwangsarbeit.',
        indigenousRule: 'Generalgouverneur in Dakar; Einheimische unter dem Entrechtungsstatut „Indigénat“',
        keyResources: ['Erdnüsse', 'Baumwolle', 'Palmkerne']
      },
      1914: {
        power: 'france',
        title: 'Föderation Französisch-Westafrika (AOF)',
        subtext: 'Riesiges Kolonialgebiet von 4,7 Millionen km²; Aushebung zehntausender afrikanischer Soldaten („Tirailleurs sénégalais“).',
        indigenousRule: 'Französisches Kolonialregime',
        keyResources: ['Tirailleurs sénégalais (Kolonialsoldaten)', 'Cash Crops']
      }
    }
  },

  // 8. LIBERIA
  {
    id: 'liberia',
    name: 'Republik Liberia',
    region: 'west',
    center: [205, 510],
    path: 'M 185,490 L 225,485 L 235,530 L 195,535 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Republik Liberia (Souverän)',
        subtext: '1847 von freigelassenen afroamerikanischen Siedlern gegründete unabhängige Republik.',
        indigenousRule: 'Präsident Anthony W. Gardiner (Ameriko-Liberianische Elite)',
        keyResources: ['Kautschuk', 'Kaffee', 'Palmöl']
      },
      1885: {
        power: 'independent',
        title: 'Republik Liberia (Souverän)',
        subtext: 'Trotz territorialer Übergriffe Großbritanniens und Frankreichs verteidigte Liberia seine Souveränität.',
        indigenousRule: 'Präsident Hilary R. W. Johnson',
        keyResources: ['Kautschuk', 'Palmöl']
      },
      1895: {
        power: 'independent',
        title: 'Republik Liberia (Souverän)',
        subtext: 'Frankreich riss Grenzgebiete an der Elfenbeinküste an sich, die Unabhängigkeit blieb jedoch bestehen.',
        indigenousRule: 'Präsident Joseph James Cheeseman',
        keyResources: ['Wildkautschuk']
      },
      1900: {
        power: 'independent',
        title: 'Republik Liberia (Souverän)',
        subtext: 'Diplomatische Unterstützung durch die USA verhinderte die vollständige Annexion durch Großbritannien oder Frankreich.',
        indigenousRule: 'Präsident William D. Coleman',
        keyResources: ['Kautschuk']
      },
      1914: {
        power: 'independent',
        title: 'Republik Liberia (Souverän geblieben)',
        subtext: 'Zusammen mit Äthiopien einer der beiden einzigen unkolonisierten Staaten des gesamten Kontinents!',
        indigenousRule: 'Präsident Daniel E. Howard',
        keyResources: ['Kautschuk', 'Handelshäfen']
      }
    }
  },

  // 9. NIGERIA & KALIFAT SOKOTO
  {
    id: 'nigeria',
    name: 'Nigeria & Kalifat Sokoto',
    region: 'west',
    center: [390, 480],
    path: 'M 350,440 L 440,430 L 445,510 L 370,545 L 340,490 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Kalifat Sokoto, Königreich Benin & Yoruba-Staaten',
        subtext: 'Mächtiges islamisches Kalifat im Norden mit blühenden Handwerks- und Textilzentren (Kano); Benin und Oyo an der Küste.',
        indigenousRule: 'Sultan von Sokoto (Umaru ibn Ali) & Oba von Benin',
        keyResources: ['Palmöl', 'Textilien', 'Leder', 'Erdnüsse']
      },
      1885: {
        power: 'britain',
        title: 'Britisches Protektorat Oil Rivers & Niger-Monopol',
        subtext: 'Sir Edward Malet setzte auf der Berliner Konferenz durch, dass Großbritannien allein die Aufsicht über den Niger erhielt.',
        indigenousRule: 'Royal Niger Company von George Goldie schließt Knebelverträge',
        keyResources: ['Palmöl für britische Seifen- & Schmierstofffabriken']
      },
      1895: {
        power: 'britain',
        title: 'Royal Niger Company & Niger Coast Protectorate',
        subtext: '1897 britische Strafexpedition gegen Benin: Plünderung tausender weltberühmter Benin-Bronzen (heute in europäischen Museen).',
        indigenousRule: 'Zerschlagung des Königreichs Benin durch die britische Marine',
        keyResources: ['Benin-Bronzen (Kulturgutraub)', 'Palmöl', 'Zinn']
      },
      1900: {
        power: 'britain',
        title: 'Protektorate Nord- und Südnigeria',
        subtext: 'Lord Frederick Lugard erobert mit der West African Frontier Force das Kalifat Sokoto mit Maxim-Maschinengewehren.',
        indigenousRule: 'Erfindung der „Indirect Rule“ (Herrschaft durch unterworfene Emire)',
        keyResources: ['Zinn', 'Erdnüsse', 'Palmöl', 'Kakao']
      },
      1914: {
        power: 'britain',
        title: 'Kolonie und Protektorat Nigeria',
        subtext: '1914 vereinte Gouverneur Lord Lugard Nord- und Südnigeria zu einer einzigen Kolonie – bis heute die bevölkerungsreichste Nation Afrikas.',
        indigenousRule: 'Britisches Kolonialregime (Indirect Rule)',
        keyResources: ['Palmöl', 'Erdnüsse', 'Zinn', 'Kohle']
      }
    }
  },

  // 10. GOLDKÜSTE (GHANA) & ASHANTI
  {
    id: 'gold_coast',
    name: 'Goldküste & Ashanti-Reich',
    region: 'west',
    center: [270, 500],
    path: 'M 255,465 L 305,460 L 310,525 L 255,520 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Ashanti-Konföderation & Britische Küste',
        subtext: 'Mächtiges Ashanti-Reich mit Hauptstadt Kumasi beherrscht das Binnenland; Briten an der Küste (Fort Cape Coast).',
        indigenousRule: 'Asantehene Mensa Bonsu',
        keyResources: ['Gold', 'Kautschuk', 'Kolanüsse']
      },
      1885: {
        power: 'independent',
        title: 'Unabhängiges Ashanti-Reich',
        subtext: 'Verteidigt seine Autonomie gegen britische Unterwerfungsversuche.',
        indigenousRule: 'Asantehene Kwaku Dua II.',
        keyResources: ['Goldminen von Obuasi', 'Holz']
      },
      1895: {
        power: 'britain',
        title: 'Britisches Protektorat & Exil des Königs',
        subtext: 'Britische Truppen besetzen 1896 Kumasi und verbannen König Prempeh I. auf die Seychellen.',
        indigenousRule: 'Königliche Familie deportiert; Widerstand formiert sich',
        keyResources: ['Gold', 'Kautschuk']
      },
      1900: {
        power: 'independent',
        title: 'Krieg um den Goldenen Stuhl (Yaa Asantewaa)',
        subtext: 'Königinmutter Yaa Asantewaa ruft zur Rebellion auf und belagert das britische Fort in Kumasi monatelang.',
        indigenousRule: 'Königinmutter Yaa Asantewaa von Ejisu',
        keyResources: ['Gold', 'Kakao'],
        resistanceEvent: 'Krieg der Goldenen Bank: Belagerung von Fort Kumasi durch Yaa Asantewaa'
      },
      1914: {
        power: 'britain',
        title: 'Kronkolonie Goldküste',
        subtext: 'Ashanti-Gebiet vollständig annektiert; weltgrößter Kakaoproduzent unter kolonialer Zwangswirtschaft.',
        indigenousRule: 'Britischer Gouverneur in Accra',
        keyResources: ['Kakao', 'Gold', 'Mangan']
      }
    }
  },

  // 11. TOGO
  {
    id: 'togo',
    name: 'Togo („Deutsche Musterkolonie“)',
    region: 'west',
    center: [320, 495],
    path: 'M 305,460 L 330,460 L 335,530 L 310,525 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Autonome Reiche der Ewe, Gen & Dagomba',
        subtext: 'Unabhängige Gesellschaften mit regem Küstenhandel.',
        indigenousRule: 'König Mlapa III. von Togoville & lokale Herrscher',
        keyResources: ['Palmöl', 'Mais', 'Traditionelles Handwerk']
      },
      1885: {
        power: 'germany',
        title: 'Deutsches Schutzgebiet Togo',
        subtext: 'Gustav Nachtigal hisste im Juli 1884 die deutsche Flagge in Togoville; auf der Konferenz als deutsches Gebiet bestätigt.',
        indigenousRule: 'Erpressung von „Schutzverträgen“ durch Nachtigal',
        keyResources: ['Palmöl', 'Kokospalmen']
      },
      1895: {
        power: 'germany',
        title: 'Deutsche Kolonie Togo',
        subtext: 'Eisenbahnbau von Lomé ins Inland; strenge Prügelstrafe („Hapag-Stock“) eingeführt.',
        indigenousRule: 'Kaiserliche Kolonialverwaltung',
        keyResources: ['Palmkerne', 'Baumwolle']
      },
      1900: {
        power: 'germany',
        title: '„Musterkolonie“ des Kaiserreichs',
        subtext: 'Einzige deutsche Kolonie, die durch drakonische Kopfsteuern ohne Reichszuschüsse auskam.',
        indigenousRule: 'Zwangsarbeitssystem unter Gouverneur Graf Zech',
        keyResources: ['Baumwolle', 'Kaffee', 'Sisal']
      },
      1914: {
        power: 'germany',
        title: 'Deutsche Kolonie Togo (Kamina-Großfunkstation)',
        subtext: 'Modernste drahtlose Großfunkstation der Welt in Kamina (Funkverbindung Berlin-Togo); im August 1914 von britisch-französischen Truppen erobert.',
        indigenousRule: 'Kapitulation im August 1914; spätere Aufteilung zwischen GB und Frankreich',
        keyResources: ['Großfunkstation Kamina', 'Baumwolle']
      }
    }
  },

  // 12. KAMERUN
  {
    id: 'cameroon',
    name: 'Kamerun',
    region: 'central',
    center: [435, 520],
    path: 'M 410,480 L 490,470 L 495,570 L 435,575 L 420,520 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Königreiche der Duala, Bamum & Fulbe-Emirate',
        subtext: 'Duala-Könige kontrollierten den lukrativen Zwischenhandel mit europäischen Handelshäusern.',
        indigenousRule: 'King Bell (Ndumbe Lobe Bell) & King Akwa',
        keyResources: ['Palmöl', 'Elfenbein', 'Kautschuk']
      },
      1885: {
        power: 'germany',
        title: 'Deutsches Schutzgebiet Kamerun',
        subtext: 'Gustav Nachtigal kam den Briten im Juli 1884 um wenige Tage zuvor; Erwerbung auf der Konferenz ratifiziert.',
        indigenousRule: 'King Bell und King Akwa unterzeichnen Abtretungsvertrag',
        keyResources: ['Palmöl', 'Kautschuk']
      },
      1895: {
        power: 'germany',
        title: 'Deutsche Kolonie Kamerun',
        subtext: 'Blutige Feldzüge ins Binnenland zur Unterwerfung des Graslands und der Adamawa-Emirate.',
        indigenousRule: 'Militärische Schutztruppe unter Jesko von Puttkamer',
        keyResources: ['Kautschuk', 'Kakao-Großplantagen am Kamerunberg']
      },
      1900: {
        power: 'germany',
        title: 'Konzessionsgesellschaften & Zwangsarbeit',
        subtext: 'Gigantische Landenteignungen zugunsten der Gesellschaft Nordwest-Kamerun (GNWK); Zehntausende Zwangsarbeiter sterben auf Plantagen.',
        indigenousRule: 'Duala-Widerstand gegen die Vertreibung aus ihren Ahnengebieten',
        keyResources: ['Wildkautschuk', 'Kautschuk', 'Kakao']
      },
      1914: {
        power: 'germany',
        title: 'Neukamerun (Hinrichtung von Rudolf Duala Manga Bell)',
        subtext: '1911 im Marokko-Kongo-Abkommen um „Neukamerun“ erweitert. Am 8. August 1914 richteten die Deutschen König Rudolf Duala Manga Bell wegen Hochverrats hin.',
        indigenousRule: 'Manga Bell vor Hinrichtung: „Mein Blut fließt nicht umsonst für das Land der Duala.“',
        keyResources: ['Kautschuk', 'Palmöl', 'Kakao'],
        resistanceEvent: 'Hinrichtung von Rudolf Duala Manga Bell & Martin-Paul Samba (August 1914)'
      }
    }
  },

  // 13. KONGO-FREISTAAT / BELGISCH-KONGO
  {
    id: 'congo_free_state',
    name: 'Kongo-Freistaat / Belgisch-Kongo',
    region: 'central',
    center: [540, 600],
    path: 'M 495,540 L 610,520 L 650,620 L 590,700 L 505,670 L 485,580 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Königreiche Kuba, Luba, Lunda & Kazembe',
        subtext: 'Jahrhundertealte hochentwickelte Staaten mit komplexen Kunst- und Rechtstraditionen im dichten Regenwald.',
        indigenousRule: 'Kuba-Könige (Kot a-Mbweeky), Luba-Herrscher & Msiri (Katanga)',
        keyResources: ['Wildkautschuk', 'Elfenbein', 'Kupfer', 'Raffia-Textilien']
      },
      1885: {
        power: 'belgium',
        title: 'Kongo-Freistaat (Privatbesitz König Leopolds II.)',
        subtext: 'Größter Triumph Leopolds II. auf der Berliner Konferenz: Über 2,3 Millionen km² wurden zu seinem persönlichen Eigentum erklärt!',
        indigenousRule: 'Association Internationale du Congo (AIC) wird souveräner Staat',
        keyResources: ['Elfenbein', 'Zollfreier Freihandel laut Konferenzakte']
      },
      1895: {
        power: 'belgium',
        title: 'Kautschuk-Terror & „Kongo-Gräuel“',
        subtext: 'Erfindung des aufblasbaren Reifens löst weltweiten Kautschukrausch aus. Leopold II. verhängt Zwangsarbeitsquoten.',
        indigenousRule: 'Force Publique (Söldner) terrorisiert Dörfer; systematisches Abhacken von Händen',
        keyResources: ['Wildkautschuk', 'Elfenbein'],
        resistanceEvent: 'Aufstand der Batetela (1895–1900) gegen die Schrecken der Force Publique'
      },
      1900: {
        power: 'belgium',
        title: 'Höhepunkt der Ausbeutung & Erster internationaler Protest',
        subtext: 'E. D. Morel, Mark Twain („King Leopold’s Soliloquy“) und Roger Casement decken den Völkermord auf: Bis zu 10 Millionen Menschen fielen dem Kautschukterror zum Opfer.',
        indigenousRule: 'Vollständige Entrechtung der Bevölkerung unter Leopold II.',
        keyResources: ['Kautschuk', 'Kupfer von Katanga']
      },
      1914: {
        power: 'belgium',
        title: 'Belgisch-Kongo (Staatskolonie seit 1908)',
        subtext: 'Nach weltweitem Entsetzen zwang das belgische Parlament den König 1908, die Privatkolonie an den Staat abzutreten.',
        indigenousRule: 'Belgische Kolonialverwaltung; Ausbeutung von Kupfer und Diamanten',
        keyResources: ['Kupfer (Katanga)', 'Kautschuk', 'Industriediamanten', 'Palmöl']
      }
    }
  },

  // 14. FRANZÖSISCH-ÄQUATORIALAFRIKA (GABUN, MITTELKONGO, TSCHAD)
  {
    id: 'french_equatorial_africa',
    name: 'Französisch-Äquatorialafrika (AEF)',
    region: 'central',
    center: [460, 480],
    path: 'M 440,380 L 530,370 L 530,460 L 485,550 L 435,510 L 440,430 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Königreich Makoko (Tio) & Gabun-Küste',
        subtext: 'Pierre Savorgnan de Brazza schloss im September 1880 den Vertrag mit König Makoko ab.',
        indigenousRule: 'König Makoko Iloo I.',
        keyResources: ['Edelhölzer', 'Elfenbein']
      },
      1885: {
        power: 'france',
        title: 'Französisch-Kongo (Brazzaville)',
        subtext: 'Auf der Konferenz sicherte de Courcel Frankreich das Nordufer des Kongo-Flusses und das Vorkaufsrecht auf Leopolds Staat.',
        indigenousRule: 'Brazza-Protektorat',
        keyResources: ['Flusskontrolle', 'Elfenbein']
      },
      1895: {
        power: 'france',
        title: 'Französisch-Kongo & Tschad-Expeditionen',
        subtext: 'Vorrücken nach Norden zum Tschadsee; brutale Zwangskonzessionen nach belgischem Vorbild.',
        indigenousRule: 'Französische Konzessionsgesellschaften',
        keyResources: ['Kautschuk', 'Tropenhölzer']
      },
      1900: {
        power: 'france',
        title: 'Konzessionssystem & Krieg gegen Rabih az-Zubayr',
        subtext: 'Schlacht von Kousséri (1900): Tötung des Herrschers Rabih az-Zubayr; Konsolidierung des Tschadgebiets.',
        indigenousRule: 'Militärterritorium Tschad',
        keyResources: ['Kautschuk', 'Elfenbein']
      },
      1914: {
        power: 'france',
        title: 'Föderation Französisch-Äquatorialafrika (AEF)',
        subtext: 'Zusammenschluss von Gabun, Mittelkongo, Ubangi-Schari und Tschad unter einem Generalgouverneur in Brazzaville.',
        indigenousRule: 'Französisches Kolonialregime',
        keyResources: ['Holz (Okoumé)', 'Baumwolle', 'Kautschuk']
      }
    }
  },

  // 15. ANGOLA & CABINDA
  {
    id: 'angola',
    name: 'Angola (Portugiesisch-Westafrika)',
    region: 'south',
    center: [520, 720],
    path: 'M 480,660 L 580,670 L 590,780 L 490,780 L 475,690 Z',
    statusByYear: {
      1880: {
        power: 'portugal',
        title: 'Portugiesische Küstenenklaven (Luanda & Benguela)',
        subtext: 'Portugal beherrschte alte Küstenhäfen; das riesige Binnenland (Ovimbundu, Chokwe) war unabhängig.',
        indigenousRule: 'Ovimbundu-Königreiche (Bailundo) & Chokwe-Herrscher',
        keyResources: ['Kaffee', 'Kautschuk', 'Wachsmärkte']
      },
      1885: {
        power: 'portugal',
        title: 'Angola & Enklave Cabinda',
        subtext: 'Portugal verlor auf der Berliner Konferenz den Kongo-Fluss, sicherte sich aber Cabinda und Gebiete südlich der Mündung.',
        indigenousRule: 'Vertrag von Simulambuco (1885) für Cabinda',
        keyResources: ['Kaffee', 'Baumwolle']
      },
      1895: {
        power: 'portugal',
        title: 'Der gescheiterte „Rosa-Karten-Plan“',
        subtext: 'Portugals Traum, Angola mit Mosambik zu verbinden (Mapa Cor-de-Rosa), wurde 1890 durch das britische Ultimatum zunichte gemacht.',
        indigenousRule: 'Portugiesische Strafexpeditionen gegen Ovimbundu-Königreiche',
        keyResources: ['Diamantenfunde', 'Kaffee']
      },
      1900: {
        power: 'portugal',
        title: 'Bailundo-Aufstand (1902)',
        subtext: 'Erbitterter antikolonialer Widerstand der Ovimbundu gegen Zwangsarbeit und Branntweinhandel.',
        indigenousRule: 'König Mutu ya Kevela von Bailundo',
        keyResources: ['Kaffee', 'Sisal', 'Zwangsarbeiter'],
        resistanceEvent: 'Bailundo-Krieg 1902: Größter antikolonialer Aufstand in Zentral-Angola'
      },
      1914: {
        power: 'portugal',
        title: 'Kolonie Angola',
        subtext: 'Feste portugiesische Kolonialherrschaft mit berüchtigtem „Chibalo“-Zwangsarbeitssystem.',
        indigenousRule: 'Portugiesische Kolonialgouverneure',
        keyResources: ['Diamanten', 'Kaffee', 'Kupfer']
      }
    }
  },

  // 16. DEUTSCH-SÜDWESTAFRIKA (NAMIBIA)
  {
    id: 'namibia',
    name: 'Deutsch-Südwestafrika (Namibia)',
    region: 'south',
    center: [490, 840],
    path: 'M 480,780 L 565,780 L 565,900 L 490,900 L 465,820 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Autonomes Herero- & Nama-Land',
        subtext: 'Rinderzüchtergesellschaften der Herero und Nama; Walvis Bay von den Briten 1878 besetzt.',
        indigenousRule: 'Kaptein Maharero (Herero) & Kaptein Hendrik Witbooi (Nama)',
        keyResources: ['Rinderherden', 'Weideland', 'Kupfer (Tsumeb)']
      },
      1885: {
        power: 'germany',
        title: 'Deutsches Schutzgebiet Südwestafrika',
        subtext: 'Adolf Lüderitz erschwindelte 1883 Landverträge („Meilenschwindel“); Bismarck stellte das Gebiet 1884 unter kaiserlichen Schutz.',
        indigenousRule: 'Hendrik Witbooi weigert sich zunächst standhaft, Verträge zu unterzeichnen',
        keyResources: ['Hafen Lüderitzbucht', 'Mineralien']
      },
      1895: {
        power: 'germany',
        title: 'Deutsche Kolonie Südwestafrika',
        subtext: 'Zunehmende Einwanderung deutscher Siedler; Rinderpest von 1897 vernichtete 90% des Viehbestands der Herero und trieb sie in die Armut.',
        indigenousRule: 'Kaiserlicher Gouverneur Theodor Leutwein spaltet Herero und Nama',
        keyResources: ['Kupfer', 'Weideland']
      },
      1900: {
        power: 'germany',
        title: 'Landraub & Siedlerkolonialismus',
        subtext: 'Bau der Eisenbahn von Swakopmund nach Windhoek; Enteignung und rassistische Demütigung der afrikanischen Bevölkerung spitzen sich zu.',
        indigenousRule: 'Herero und Nama bereiten sich auf den Freiheitskampf vor',
        keyResources: ['Kupfer', 'Marmor', 'Weideland']
      },
      1914: {
        power: 'germany',
        title: 'Nach dem Völkermord (1904–1908)',
        subtext: 'Lothar von Trothas Vernichtungsbefehl: Bis zu 80% der Herero und 50% der Nama wurden ermordet oder starben in Konzentrationslagern. 1908 Diamantenfund bei Kolmannskuppe.',
        indigenousRule: 'Überlebende zu rechtlosen Zwangsarbeitern mit Passmarken degradiert',
        keyResources: ['Diamantenrausch von Kolmannskuppe', 'Kupfer (Tsumeb)'],
        resistanceEvent: 'Völkermord an den Herero und Nama (1904–1908) unter Lothar von Trotha'
      }
    }
  },

  // 17. SÜDAFRIKA (KAPKOLONIE, NATAL, TRANSVAAL, ORANJE)
  {
    id: 'south_africa',
    name: 'Südafrika & Burenrepubliken',
    region: 'south',
    center: [570, 930],
    path: 'M 495,900 L 630,860 L 640,970 L 530,1020 L 490,950 Z',
    statusByYear: {
      1880: {
        power: 'britain',
        title: 'Britische Kapkolonie, Natal & Burenrepubliken',
        subtext: 'Nach dem Zulukrieg 1879 besetzten die Briten Zululand; Burenrepubliken Transvaal und Oranje-Freistaat unabhängig.',
        indigenousRule: 'Zulukönig Cetshwayo besiegt; Präsident Paul Kruger in Transvaal',
        keyResources: ['Diamanten von Kimberley', 'Wolle', 'Agrar']
      },
      1885: {
        power: 'britain',
        title: 'Britisches Vordringen nach Betschuanaland',
        subtext: 'Großbritannien annektiert Betschuanaland (Botswana) 1885, um den Zusammenschluss von Deutschen (Südwest) und Buren zu blockieren.',
        indigenousRule: 'Burenpräsident Paul Kruger verteidigt Unabhängigkeit',
        keyResources: ['Diamanten von Kimberley', 'Handelswege nach Norden']
      },
      1895: {
        power: 'britain',
        title: 'Goldrausch am Witwatersrand & Jameson Raid',
        subtext: '1886 Entdeckung der reichsten Goldfelder der Welt in Johannesburg; Cecil Rhodes plant den Sturz der Buren (Jameson Raid 1895).',
        indigenousRule: 'Kaiser Wilhelm II. sendet die berüchtigte „Krüger-Depesche“ nach Pretoria',
        keyResources: ['Witwatersrand-Gold', 'Kimberley-Diamanten']
      },
      1900: {
        power: 'britain',
        title: 'Zweiter Burenkrieg (1899–1902)',
        subtext: 'Großbritannien setzt über 400.000 Soldaten ein, brennt Farmen nieder und richtet erste Konzentrationslager ein, in denen 28.000 Burenfrauen und -kinder und 20.000 Afrikaner sterben.',
        indigenousRule: 'Burischer Guerillakrieg gegen Lord Kitchener',
        keyResources: ['Goldminen von Johannesburg'],
        resistanceEvent: 'Zweiter Burenkrieg: Zerstörung von Farmen & Errichtung von Konzentrationslagern'
      },
      1914: {
        power: 'britain',
        title: 'Südafrikanische Union (Britisches Dominion seit 1910)',
        subtext: 'Zusammenschluss von Kap, Natal, Transvaal und Freistaat. 1913 Natives Land Act: Afrikaner (über 70% der Bevölkerung) dürfen nur noch 7% des Landes besitzen (Grundstein der Apartheid).',
        indigenousRule: 'Weiße Minderheitsregierung unter burischen Generälen (Botha / Smuts)',
        keyResources: ['Weltgrößte Gold- und Diamantenförderung']
      }
    }
  },

  // 18. MOSAMBIK
  {
    id: 'mozambique',
    name: 'Mosambik (Portugiesisch-Ostafrika)',
    region: 'east',
    center: [670, 770],
    path: 'M 640,680 L 690,680 L 730,780 L 670,880 L 620,830 L 635,740 Z',
    statusByYear: {
      1880: {
        power: 'portugal',
        title: 'Portugiesische Küstenfestungen & Gaza-Reich',
        subtext: 'Alte portugiesische Festungen an der Küste (Inhambane, Lourenço Marques, Ilha de Moçambique); Gaza-Reich beherrscht das Inland.',
        indigenousRule: 'König Muzila (Gaza-Königreich)',
        keyResources: ['Elfenbein', 'Sklavenhandel (illegal)', 'Häfen']
      },
      1885: {
        power: 'portugal',
        title: 'Portugiesisch-Ostafrika auf der Konferenz',
        subtext: 'Bismarcks Konferenz zwang Portugal, freie Schifffahrt auf dem Sambesi zu gewähren.',
        indigenousRule: 'Gaza-Kaiserreich unter König Gungunhana',
        keyResources: ['Sambesi-Handel', 'Zuckerrohr']
      },
      1895: {
        power: 'portugal',
        title: 'Krieg gegen das Gaza-Reich (1895)',
        subtext: 'Militärische Unterwerfung von Gungunhana; Verleihung von Konzessionen an britische Finanziers (Companhia de Moçambique).',
        indigenousRule: 'Gungunhana gefangen genommen und auf die Azoren verbannt',
        keyResources: ['Kopramärkte', 'Zucker', 'Arbeitskraft für Rand-Minen']
      },
      1900: {
        power: 'portugal',
        title: 'Konzessionskolonie Mosambik',
        subtext: 'Große Teile des Landes an private Charters übergeben; Arbeitsmigration in die Minen von Johannesburg.',
        indigenousRule: 'Privatgesellschaften herrschen mit Schlägertruppen',
        keyResources: ['Zuckerrohr', 'Sisal', 'Arbeitsmigranten-Zölle']
      },
      1914: {
        power: 'portugal',
        title: 'Kolonie Mosambik',
        subtext: 'Wichtiger Durchgangshafen für das britische Transvaal (Eisenbahn Lourenço Marques – Johannesburg).',
        indigenousRule: 'Portugiesische Kolonialverwaltung',
        keyResources: ['Tee', 'Baumwolle', 'Hafengebühren']
      }
    }
  },

  // 19. DEUTSCH-OSTAFRIKA (TANSANIA, RUANDA, BURUNDI)
  {
    id: 'german_east_africa',
    name: 'Deutsch-Ostafrika (Tansania, Ruanda, Burundi)',
    region: 'east',
    center: [680, 620],
    path: 'M 620,530 L 730,520 L 740,640 L 685,670 L 620,670 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Sultanat Sansibar & Reiche von Hehe und Nyamwezi',
        subtext: 'Der Sultan von Sansibar beherrschte die Küste; Mirambo (Nyamwezi) und Mkwawa (Hehe) bauten starke afrikanische Staaten auf.',
        indigenousRule: 'Sultan Barghash ibn Said & Mirambo',
        keyResources: ['Gewürznelken von Sansibar', 'Elfenbein', 'Karawanenrouten']
      },
      1885: {
        power: 'germany',
        title: 'Kaiserlicher Schutzbrief für Carl Peters',
        subtext: 'Am 27. Februar 1885 (einen Tag nach Abschluss der Berliner Konferenz!) unterzeichnete Bismarck den Schutzbrief für die Gesellschaft für deutsche Kolonisation.',
        indigenousRule: 'Carl Peters erschwindelte gefälschte Verträge mit betrunkenen Häuptlingen',
        keyResources: ['Karawanenrouten zum Tanganjikasee']
      },
      1895: {
        power: 'germany',
        title: 'Kaiserliche Kolonie Deutsch-Ostafrika',
        subtext: '1888 Aufstand von Abushiri an der Küste mit Reichstruppen (Hermann von Wissmann) niedergeschlagen. Hehe-Krieg unter Häuptling Mkwawa (1891–1898).',
        indigenousRule: 'Mkwawa schlägt die Schutztruppe bei Lugalo (1891) vernichtend',
        keyResources: ['Kaffee', 'Sisal', 'Kautschuk'],
        resistanceEvent: 'Schlacht von Lugalo (1891): Mkwawas Hehe vernichten deutsche Schutztruppen-Kolonne'
      },
      1900: {
        power: 'germany',
        title: 'Einführung des Zwangsanbaus von Baumwolle',
        subtext: 'Gouverneur Graf von Götzen zwang Dörfer zur kollektiven Baumwollarbeit; Mkwawa wählte 1898 den Freitod, sein Schädel wurde nach Deutschland gebracht.',
        indigenousRule: 'Brutales System von Prügelstrafen und Zwangsarbeit',
        keyResources: ['Sisal (weltgrößter Produzent)', 'Baumwolle', 'Kaffee']
      },
      1914: {
        power: 'germany',
        title: 'Nach dem Maji-Maji-Krieg (1905–1907)',
        subtext: 'Über 250.000 bis 300.000 Afrikaner starben durch die deutsche Taktik der „verbrannten Erde“ (Zerstörung von Ernten und Brunnen). Größte und bevölkerungsreichste deutsche Kolonie.',
        indigenousRule: 'General Paul von Lettow-Vorbeck bereitet Kolonie auf den 1. Weltkrieg vor',
        keyResources: ['Sisal', 'Kaffee', 'Kautschuk'],
        resistanceEvent: 'Maji-Maji-Krieg (1905–1907): Völkermörderische Hungerkampagne der Schutztruppe'
      }
    }
  },

  // 20. BRITISCH-OSTAFRIKA (KENIA & UGANDA)
  {
    id: 'british_east_africa',
    name: 'Britisch-Ostafrika (Kenia & Uganda)',
    region: 'east',
    center: [710, 500],
    path: 'M 670,440 L 740,430 L 775,500 L 720,530 L 660,530 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Königreich Buganda, Maasai & Kikuyu',
        subtext: 'Das mächtige Königreich Buganda am Viktoriasee mit eigener Flotte aus Kriegskanus; Maasai kontrollierten das Hochland.',
        indigenousRule: 'Kabaka Mutesa I. von Buganda',
        keyResources: ['Rinder', 'Elfenbein', 'Eisen']
      },
      1885: {
        power: 'independent',
        title: 'Unabhängige ostafrikanische Gesellschaften',
        subtext: 'Großbritannien und Deutschland verhandelten in geheimen Abkommen über die Aufteilung der Einflusssphären.',
        indigenousRule: 'Kabaka Mwanga II. von Buganda',
        keyResources: ['Karawanenwege']
      },
      1895: {
        power: 'britain',
        title: 'Protektorate Ostafrika & Uganda',
        subtext: '1890 Helgoland-Sansibar-Vertrag: Deutschland trat Ansprüche auf Sansibar und Uganda an Großbritannien ab (dafür Helgoland in der Nordsee!).',
        indigenousRule: 'Beginn des Baus der Uganda-Bahn von Mombasa nach Kisumu („Lunatic Line“)',
        keyResources: ['Elfenbein', 'Kaffee', 'Baumwolle']
      },
      1900: {
        power: 'britain',
        title: 'Uganda-Agreement (1900) & Siedlerkolonie Kenia',
        subtext: 'Vertreibung der Maasai aus dem fruchtbaren Hochland („White Highlands“); indische Kontraktarbeiter bauen die Eisenbahn.',
        indigenousRule: 'Britische Verträge mit den Häuptlingen von Buganda',
        keyResources: ['Tee', 'Kaffee', 'Eisenbahnlinie nach Kampala']
      },
      1914: {
        power: 'britain',
        title: 'Kronkolonie Kenia & Protektorat Uganda',
        subtext: 'Britische Festung in Ostafrika mit Großplantagen von weißem Adel (Lord Delamere).',
        indigenousRule: 'Britischer Gouverneur in Nairobi',
        keyResources: ['Tee', 'Kaffee', 'Sisal']
      }
    }
  },

  // 21. KAISERREICH ÄTHIOPIEN (ABESSINIEN)
  {
    id: 'ethiopia',
    name: 'Kaiserreich Äthiopien (Abessinien)',
    region: 'horn',
    center: [750, 420],
    path: 'M 710,380 L 800,370 L 820,460 L 740,480 L 690,440 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Kaiserreich Äthiopien (Souverän)',
        subtext: 'Jahrtausendealte unabhängige christliche Monarchie; Kaiser Yohannes IV. verteidigte das Reich gegen ägyptische Invasoren.',
        indigenousRule: 'Kaiser Yohannes IV. & König Menelik von Shewa',
        keyResources: ['Kaffee (Ursprungsland Kaffa)', 'Gold', 'Teff', 'Waffenimporte']
      },
      1885: {
        power: 'independent',
        title: 'Kaiserreich Äthiopien (Souverän)',
        subtext: 'Italien besetzte 1885 mit britischer Duldung den Hafen Massaua am Roten Meer, um Äthiopien vom Meer abzuschneiden.',
        indigenousRule: 'Kaiser Yohannes IV.',
        keyResources: ['Kaffee', 'Waffenarsenale']
      },
      1895: {
        power: 'independent',
        title: 'Kaiser Menelik II. rüstet zur Abwehrschlacht',
        subtext: 'Italien fälschte Artikel 17 des Vertrags von Wuchale (1889) und behauptete ein Protektorat. Kaiserin Taytu Betul zerriss das Abkommen.',
        indigenousRule: 'Kaiser Menelik II. & Kaiserin Taytu Betul',
        keyResources: ['Kaffee', '100.000 moderne Repetiergewehre'],
        resistanceEvent: 'Mobilisierung des gesamten Reiches gegen die italienische Invasion'
      },
      1900: {
        power: 'independent',
        title: 'Sieger von Adwa: Weltweit anerkannte Großmacht',
        subtext: 'Am 1. März 1896 schlug die äthiopische Armee die Italiener bei Adwa vernichtend. Alle europäischen Mächte mussten Botschaften in Addis Abeba eröffnen!',
        indigenousRule: 'Kaiser Menelik II. der Große & Kaiserin Taytu Betul',
        keyResources: ['Kaffee', 'Gold', 'Ausbau von Telegraf und Eisenbahn nach Dschibuti'],
        resistanceEvent: '1. März 1896: Vernichtender Sieg bei Adwa – Äthiopien bleibt unbesiegt'
      },
      1914: {
        power: 'independent',
        title: 'Vollkommen souveränes Kaiserreich Äthiopien',
        subtext: 'Zusammen mit Liberia der einzige afrikanische Staat, der die imperiale Aufteilungswelle siegreich abwehrte.',
        indigenousRule: 'Lij Iyasu (Designierter Kaiser)',
        keyResources: ['Kaffee', 'Eisenbahnverbindung zum Roten Meer']
      }
    }
  },

  // 22. SOMALIA & HORN VON AFRIKA
  {
    id: 'somalia',
    name: 'Somalia (Britisch-, Italienisch-, Französisch-Somaliland)',
    region: 'horn',
    center: [820, 480],
    path: 'M 790,410 L 870,430 L 890,520 L 810,540 L 790,470 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Sultanate Majeerteen, Hobyo & Geledi',
        subtext: 'Stolze seefahrende Sultanate mit alten Karawanen- und Weihrauchhandelsrouten.',
        indigenousRule: 'Sultan Osman Mahamuud & Sultan Yusuf Ali Kenadid',
        keyResources: ['Weihrauch', 'Myrrhe', 'Viehexport nach Arabien']
      },
      1885: {
        power: 'independent',
        title: 'Autonome Somali-Küstengebiete',
        subtext: 'Briten sicherten sich Berbera zur Versorgung ihrer Garnison in Aden; Franzosen fassten Fuß in Dschibuti.',
        indigenousRule: 'Somali-Clans',
        keyResources: ['Vieh', 'Hafen Berbera']
      },
      1895: {
        power: 'italy',
        title: 'Dreiteilung Somalias (Italien, GB, Frankreich)',
        subtext: 'Italien übernahm das Protektorat über Südsomalia; Großbritannien kontrollierte den Norden.',
        indigenousRule: 'Dervish-Befreiungsbewegung unter Sayyid Mohammed Abdullah Hassan formiert sich',
        keyResources: ['Häfen am Indischen Ozean']
      },
      1900: {
        power: 'independent',
        title: 'Derwisch-Aufstand („Mad Mullah“)',
        subtext: 'Mohammed Abdullah Hassan führte 20 Jahre lang einen erbitterten Dschihad gegen die britischen und italienischen Besatzer.',
        indigenousRule: 'Sayyid Mohammed Abdullah Hassan (Derwisch-Staat)',
        keyResources: ['Weihrauch', 'Pferdezucht'],
        resistanceEvent: 'Derwisch-Befreiungskrieg: Sayyid Mohammed schlägt britische Kolonnen zurück'
      },
      1914: {
        power: 'italy',
        title: 'Geteiltes Somaliland',
        subtext: 'Aufgeteilt in Britisch-Somaliland, Italienisch-Somaliland und Französisch-Somaliland (Dschibuti).',
        indigenousRule: 'Kolonialgarnisonen unter andauerndem Guerillabeschuss',
        keyResources: ['Viehwirtschaft', 'Hafenkontrolle']
      }
    }
  },

  // 23. MADAGASKAR
  {
    id: 'madagascar',
    name: 'Madagaskar',
    region: 'east',
    center: [810, 780],
    path: 'M 790,690 L 825,710 L 820,860 L 780,880 L 785,760 Z',
    statusByYear: {
      1880: {
        power: 'independent',
        title: 'Königreich Madagaskar (Merina-Monarchie)',
        subtext: 'Zentralisierter moderner Inselstaat mit Parlament, Schulen und eigener Verfassung.',
        indigenousRule: 'Königin Ranavalona II. & Premierminister Rainilaiarivony',
        keyResources: ['Vanille', 'Reis', 'Edelhölzer', 'Rinder']
      },
      1885: {
        power: 'independent',
        title: 'Erster Madagaskar-Krieg',
        subtext: 'Frankreich bombardierte Küstenstädte und erzwang im Vertrag von 1885 die Kontrolle über die Außenpolitik.',
        indigenousRule: 'Königin Ranavalona III. & Rainilaiarivony',
        keyResources: ['Gewürze', 'Hafen Diego-Suarez']
      },
      1895: {
        power: 'france',
        title: 'Französische Invasion von Antananarivo (1895)',
        subtext: 'Französische Expeditionsarmee marschiert in die Hauptstadt ein; das Königreich wird zum Protektorat erklärt.',
        indigenousRule: 'Menalamba-Guerillaaufstand gegen die französische Fremdherrschaft',
        keyResources: ['Vanille', 'Kaffee', 'Edelsteine']
      },
      1900: {
        power: 'france',
        title: 'Französische Kolonie Madagaskar',
        subtext: 'General Joseph Gallieni schaffte 1897 die 300 Jahre alte Merina-Monarchie ab und verbannte Königin Ranavalona III. nach Algerien.',
        indigenousRule: 'Französisches Militärregime unter General Gallieni',
        keyResources: ['Vanille', 'Nelken', 'Graphit']
      },
      1914: {
        power: 'france',
        title: 'Kolonie Madagaskar & Dependenzen',
        subtext: 'Vollständig integrierte französische Inselkolonie; Zwangsarbeit im Straßen- und Eisenbahnbau.',
        indigenousRule: 'Französischer Generalgouverneur in Antananarivo',
        keyResources: ['Vanille (Weltmarktführer)', 'Graphit', 'Kaffee']
      }
    }
  }
];
