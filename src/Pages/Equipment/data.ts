export type EquipmentCategoryDTO = {
  category: string;
  items: string[];
};

export const equipmentByCategory: EquipmentCategoryDTO[] = [
  {
    category: "Guitars",
    items: [
      "Fender Stratocaster USA 2000s",
      "Fender Telecaster USA 2000s",
      "Fender Jazzmaster 65 Reissue USA 2010s",
      "Fender Jaguar MIJ 1990s",
      "Fender Precision Bass CIJ 1990s",
      "Gibson SG 62 Reissue USA 2020",
      "Epiphone Korea 1990s",
      "Godin Radiator CANADA 2000s",
      "Morris W-50 Japan 1970s",
    ],
  },
  {
    category: "Amplifiers",
    items: [
      "Marshall 100w JVM410h",
      "Laney 5w L5 Lionheart studio",
      "Blackstart 5w HT5",
    ],
  },
  {
    category: "Microphones",
    items: [
      "1x AKG C414 xls",
      "2x Rode NT5",
      "1x Shure Beta 52a",
      "2x Shure SM57",
      "2x Shure SM58",
      "1x Sennheiser e906",
      "2x Sennheiser MD421-2",
    ],
  },
  {
    category: "Hardware",
    items: [
      "Allen & Heath Zed 421",
      "Audient ID22",
      "Focusrite Clarret+ Octopre",
      "La-2a Compressor Golden Age Project Comp-2a",
      "1176 Compressor Black Lion Audio Bluey",
      "2x DBX166 Bus Compressor",
      "Drawmer DS201 Gate",
      "1073 EQ Golden Age Project EQ73mk 2",
      "Lexicon Reverb",
      "TC Electronic Digital Delay Processor",
      "Akai X-1000 Reel to Reel tape machine",
      "Palmer DiCappo Reamplification box",
      "Yamaha HS-8 Studio Monitors",
      "M-Audio 49key Midi Controller",
    ],
  },
  {
    category: "Drums",
    items: [
      "Ludwig Classic Maple 14x22 Kick",
      "Ludwig Classic Maple 16x16 Floor Tom",
      "Ludwig Classic Maple 9x13 Rack Rom",
      "Ludwig Black Beauty 14x6.5 Snare",
      "Paiste 2oo2 Black Label 14\" Hihat",
      "Paiste 2oo2 14\" Hihat",
      "Paiste 2oo2 16\" Crash",
      "Paiste 2oo2 18\" Crash",
      "Paiste 2oo2 20\" Ride",
      "Paiste 2oo2 8\" Splash",
      "Auxiliary Percussion",
    ],
  },
  {
    category: "Guitar Pedals",
    items: [
      "Solid Gold FX If 6 Was 9 Fuzzface",
      "Zvex Fuzz Factory",
      "EHX Rams Head Big Muff",
      "EHX Memory Man",
      "EHX Holy Grain",
      "EHX Pulsar Tremolo",
      "EHX POG Polyphonic Octave",
      "MXR script Phase 90 Phaser",
      "MXR Dynacomp Compressor",
      "MXR Brown Acid Tone Bender",
      "Boss SD-1 Super Overdrive",
      "Boss NS-1x Noise Surpressor",
      "Boss CH-1 Chorus",
      "TC-Electronic Helix Stereo Phaser",
      "TC-Electronic Polytune Nano",
      "Line-6 DL-4 Delay Modeller",
      "Proco Rat Distortion",
      "Vox Satchurator Distortion",
      "Wampler Plexidrive Deluxe Distorion",
      "JHS Ghostly Mids clean boost",
      "Custom Audio Electronics MC404 Wah",
      "Sans-Amp Bass Driver",
      "Digitech Whammy DT",
      "Stone Deaf Parametric EQ Distortion"
    ],
  },
];

export const featuredEquipment = [
  { category: "Guitars", item: "Fender Jazzmaster 65 Reissue USA 2010s" },
  { category: "Guitars", item: "Gibson SG 62 Reissue USA 2020" },
  { category: "Amplifiers", item: "Marshall 100w JVM410h" },
  { category: "Microphones", item: "1x AKG C414 xls" },
  { category: "Hardware", item: "1176 Compressor Black Lion Audio Bluey" },
  { category: "Drums", item: "Ludwig Black Beauty 14x6.5 Snare" },
  { category: "Guitar Pedals", item: "Digitech Whammy DT" },
];
