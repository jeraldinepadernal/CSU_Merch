export type MerchCategory =
  | "Lanyard"
  | "Button Pin"
  | "T-Shirt"
  | "Keychain"
  | "Tote Bag"
  | "Jacket";

export type MerchItem = {
  id: string;
  name: string;
  category: MerchCategory;
  colors: string[];
  sizes?: string[];
  limitedSupply?: boolean;
  image: string; // path inside /public, e.g. /images/merch/ccis/lanyard.png
};

export type EntityMerch = {
  code: string;
  event?: string;
  items: MerchItem[];
};

const SIZES = ["XS", "S", "M", "L"];

export const merchandise: EntityMerch[] = [
  { code: "CAA", items: [] }, // no merchandise

  {
    code: "CCIS",
    event: "Sangka",
    items: [
      {
        id: "ccis-lanyard",
        name: "Lanyard",
        category: "Lanyard",
        limitedSupply: true,
        colors: ["Black", "Red", "White"],
        image: "/images/merch/ccis/lanyard.png",
      },
      {
        id: "ccis-pin",
        name: "Button Pin",
        category: "Button Pin",
        limitedSupply: true,
        colors: ["Orange", "White", "Red", "Black"],
        image: "/images/merch/ccis/button-pin.png",
      },
      {
        id: "ccis-tshirt-1",
        name: "T-Shirt (Design 1)",
        category: "T-Shirt",
        colors: ["White", "Orange", "Red"],
        sizes: SIZES,
        image: "/images/merch/ccis/tshirt-1.png",
      },
      {
        id: "ccis-tshirt-2",
        name: "T-Shirt (Design 2)",
        category: "T-Shirt",
        colors: ["Black", "Orange", "Red"],
        sizes: SIZES,
        image: "/images/merch/ccis/tshirt-2.png",
      },
    ],
  },

  {
    code: "CEGS",
    event: "Sangka",
    items: [
      {
        id: "cegs-lanyard",
        name: "Lanyard",
        category: "Lanyard",
        colors: ["Olive Green", "Mustard Gold", "Black", "White"],
        image: "/images/merch/cegs/lanyard.png",
      },
      {
        id: "cegs-tshirt-1",
        name: "T-Shirt (Design 1)",
        category: "T-Shirt",
        colors: ["Maroon", "Black", "White"],
        sizes: SIZES,
        image: "/images/merch/cegs/tshirt-1.png",
      },
      {
        id: "cegs-tshirt-2",
        name: "T-Shirt (Design 2)",
        category: "T-Shirt",
        colors: ["Olive Green", "Mustard Gold", "Black", "White"],
        sizes: SIZES, // sizes were not listed in the source; assumed XS-L
        image: "/images/merch/cegs/tshirt-2.png",
      },
    ],
  },

  {
    code: "CHASS",
    event: "Sangka",
    items: [
      {
        id: "chass-lanyard",
        name: "Lanyard",
        category: "Lanyard",
        colors: ["Dark Violet", "Magenta", "White", "Indigo"],
        image: "/images/merch/chass/lanyard.png",
      },
      {
        id: "chass-tshirt-1",
        name: "T-Shirt (Design 1)",
        category: "T-Shirt",
        colors: ["Royal Purple", "Lavender", "Black", "White"],
        sizes: SIZES,
        image: "/images/merch/chass/tshirt-1.png",
      },
      {
        id: "chass-tshirt-2",
        name: "T-Shirt (Design 2)",
        category: "T-Shirt",
        colors: ["Lavender", "White"],
        sizes: SIZES,
        image: "/images/merch/chass/tshirt-2.png",
      },
    ],
  },

  {
    code: "CMNS",
    event: "Sangka",
    items: [
      {
        id: "cmns-lanyard-1",
        name: "Lanyard (Red & White)",
        category: "Lanyard",
        colors: ["Crimson Red", "White"],
        image: "/images/merch/cmns/lanyard-1.png",
      },
      {
        id: "cmns-lanyard-2",
        name: "Lanyard (Red & Black)",
        category: "Lanyard",
        colors: ["Crimson Red", "Black"],
        image: "/images/merch/cmns/lanyard-2.png",
      },
      {
        id: "cmns-pin",
        name: "Button Pin",
        category: "Button Pin",
        colors: ["White", "Crimson Red", "Black"],
        image: "/images/merch/cmns/button-pin.png",
      },
      {
        id: "cmns-tshirt",
        name: "T-Shirt",
        category: "T-Shirt",
        colors: ["White", "Black", "Crimson Red"],
        sizes: SIZES,
        image: "/images/merch/cmns/tshirt.png",
      },
    ],
  },

  {
    code: "LCO",
    event: "Dagyaw",
    items: [
      {
        id: "lco-lanyard",
        name: "Lanyard",
        category: "Lanyard",
        colors: ["White", "Brown"],
        image: "/images/merch/lco/lanyard.png",
      },
      {
        id: "lco-pin",
        name: "Button Pin",
        category: "Button Pin",
        colors: ["White", "Brown"],
        image: "/images/merch/lco/button-pin.png",
      },
      {
        id: "lco-tote",
        name: "Tote Bag",
        category: "Tote Bag",
        colors: ["Emerald Green", "White", "Brown"],
        image: "/images/merch/lco/tote-bag.png",
      },
      {
        id: "lco-tshirt-1",
        name: "T-Shirt (Design 1)",
        category: "T-Shirt",
        colors: ["Black", "White"],
        sizes: SIZES,
        image: "/images/merch/lco/tshirt-1.png",
      },
      {
        id: "lco-tshirt-2",
        name: "T-Shirt (Design 2)",
        category: "T-Shirt",
        colors: ["Brown", "White"],
        sizes: SIZES,
        image: "/images/merch/lco/tshirt-2.png",
      },
      {
        id: "lco-jacket-1",
        name: "Jacket (Black & Gold)",
        category: "Jacket",
        colors: ["Black", "Gold"],
        sizes: SIZES,
        image: "/images/merch/lco/jacket-1.png",
      },
      {
        id: "lco-jacket-2",
        name: "Jacket (White & Gold)",
        category: "Jacket",
        colors: ["White", "Gold"],
        sizes: SIZES,
        image: "/images/merch/lco/jacket-2.png",
      },
    ],
  },

  {
    code: "USG",
    event: "Sangka",
    items: [
      {
        id: "usg-lanyard",
        name: "Lanyard",
        category: "Lanyard",
        colors: ["Black", "Red", "White", "Orange"],
        image: "/images/merch/usg/lanyard.png",
      },
      {
        id: "usg-keychain",
        name: "Keychain",
        category: "Keychain",
        colors: [
          "Black",
          "Blue",
          "Orange",
          "Gold",
          "Vermilion",
          "Crimson Red",
          "Emerald Green",
          "Purple",
        ],
        image: "/images/merch/usg/keychain.png",
      },
      {
        id: "usg-pin",
        name: "Button Pin",
        category: "Button Pin",
        colors: [
          "Black",
          "Blue",
          "Orange",
          "Gold",
          "Vermilion",
          "Emerald Green",
          "Purple",
          "Crimson Red",
        ],
        image: "/images/merch/usg/button-pin.png",
      },
    ],
  },
];