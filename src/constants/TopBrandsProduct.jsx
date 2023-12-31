
// third-party
import { add, sub } from "date-fns";
import Chance from "chance";
import prod1 from '../assets/images/e-commerce/mms1.jpg'
import mms from '../assets/images/e-commerce/mms2.png'
import mms1 from '../assets/images/e-commerce/mms1.jpg'
import mms2 from '../assets/images/e-commerce/mms2.png'
import mms3 from '../assets/images/e-commerce/mms3ff.png'
import similac1 from '../assets/images/e-commerce/similac1.png'
import similac2 from '../assets/images/e-commerce/similac2.png'
import similac3 from '../assets/images/e-commerce/similac3.png'
import farex1 from '../assets/images/e-commerce/farex1.jpg'
import farex2 from '../assets/images/e-commerce/farex2.png'
import farex3 from '../assets/images/e-commerce/farex3.png'
import cetaphil from '../assets/images/e-commerce/cetaphil.png'
import cetaphilM from '../assets/images/e-commerce/cetaphilM.png'
import similaca2 from '../assets/images/e-commerce/similaca2.png'
import similacA1 from '../assets/images/e-commerce/similacA1.jpg'
import similacA3 from '../assets/images/e-commerce/simlacA3.jpg'
import FormatPrice from "../ui-component/FormatPrice";
const chance = new Chance();

const topBrandProducts = [
    {
        id: 1,
        image: cetaphilM,
        name: "Cetaphil Moisturizing Cream Dry 250g",
        description: "Cetaphil Moisturizing Cream Dry is a daily cream specially formulated to provide intensive hydration to dry and sensitive skin. You can apply it to the face, hands, feet, elbows, knees - basically anywhere where the skin needs intensive hydration. To begin with, it has a unique formula. Glycerin has the ability to attract water and bind it to the skin. Niacinamide leads to better skin hydration and a healthier skin barrier. And Panthenol hydrates, softens and soothes the skin. In essence, it can not only deeply hydrate and nourish the skin but also promote a healthier skin barrier enhancing skin protection against daily aggressions. In addition, its rich texture is easy to spread, leaving no feeling of greasiness, and is rapidly absorbed.",
        rating: 100, discount: 25,
        salePrice: 1776,
        offerPrice: 1750,
        gender: "male",
        categories: ["fashion", "books"],
        colors: ["errorDark", "orangeDark", "errorMain", "secondaryMain"],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true,
    },
    {
        id: 2,
        image: mms1,
        name: "MMS - Stage 1",
        description: "WHOLESOME SUPPLEMENTS : It is stage 1 infant formula for the babies 0 to 6 months. Rich in valuable nutritional ingredients such as Nucleotides, Choline, Biotin, Linoleic acid (omega 6) and Linolenic acid (omega 3). and provides all essential early age nutritional value required by babies.FORTIFIED WITH 32 ESSENTIAL NUTRIENT: Suitable for infants from birth to 6 months old.This is rich in valuable nutritional ingredients such as Nucleotides, Choline, Biotin, Linoleic acid(omega 6) and Linolenic acid(omega 3).that are known to support healthy growth of the baby.EASY ON STOMACH: It has Superior fat source which helps in easier digestion and formation of softer stools..It contains Choline which helps in early days brain development, improving cognition and memory in babies.IMMUNE BOOSTER: Your baby's immunity is mostly build during early days only. Our baby product contains Nucleotides which help to build the baby’s immune system. Contains Optimum whey:casein (60:40) which is similar to the breastmilk.100 % NATURAL : No added sugar, No preservatives, No artificial colours & flavours.",
        rating: 100, discount: 25,
        salePrice: 1016,
        offerPrice: 1000,
        gender: "male",
        categories: ["fashion", "books"],
        colors: ["errorDark", "orangeDark", "errorMain", "secondaryMain"],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true,
    },
    {
        id: 3,
        image: mms2,
        name: "MMS - Stage 2",
        description: "WHOLESOME SUPPLEMENTS : It is stage 2 infant formula for the babies 0 to 6 months. Rich in valuable nutritional ingredients such as Nucleotides, Choline, Biotin, Linoleic acid (omega 6) and Linolenic acid (omega 3). and provides all essential early age nutritional value required by babies.FORTIFIED WITH 32 ESSENTIAL NUTRIENT: Suitable for infants from birth to 6 months old.This is rich in valuable nutritional ingredients such as Nucleotides, Choline, Biotin, Linoleic acid(omega 6) and Linolenic acid(omega 3).that are known to support healthy growth of the baby.EASY ON STOMACH: It has Superior fat source which helps in easier digestion and formation of softer stools..It contains Choline which helps in early days brain development, improving cognition and memory in babies.IMMUNE BOOSTER: Your baby's immunity is mostly build during early days only. Our baby product contains Nucleotides which help to build the baby’s immune system. Contains Optimum whey:casein (60:40) which is similar to the breastmilk.100 % NATURAL : No added sugar, No preservatives, No artificial colours & flavours.",
        rating: 100, discount: 25,
        salePrice: 957,
        offerPrice: 940,
        gender: "male",
        categories: ["fashion", "books"],
        colors: ["errorDark", "orangeDark", "errorMain", "secondaryMain"],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true,
    },
    {
        id: 4,
        image: mms3,
        name: "MMS - Stage 3",
        description: "WHOLESOME SUPPLEMENTS : It is stage 3 infant formula for the babies 0 to 6 months. Rich in valuable nutritional ingredients such as Nucleotides, Choline, Biotin, Linoleic acid (omega 6) and Linolenic acid (omega 3). and provides all essential early age nutritional value required by babies.FORTIFIED WITH 32 ESSENTIAL NUTRIENT: Suitable for infants from birth to 6 months old.This is rich in valuable nutritional ingredients such as Nucleotides, Choline, Biotin, Linoleic acid(omega 6) and Linolenic acid(omega 3).that are known to support healthy growth of the baby.EASY ON STOMACH: It has Superior fat source which helps in easier digestion and formation of softer stools..It contains Choline which helps in early days brain development, improving cognition and memory in babies.IMMUNE BOOSTER: Your baby's immunity is mostly build during early days only. Our baby product contains Nucleotides which help to build the baby’s immune system. Contains Optimum whey:casein (60:40) which is similar to the breastmilk.100 % NATURAL : No added sugar, No preservatives, No artificial colours & flavours.",
        rating: 100, discount: 25,
        salePrice: 1016,
        offerPrice: 1000,
        gender: "male",
        categories: ["fashion", "books"],
        colors: ["errorDark", "orangeDark", "errorMain", "secondaryMain"],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true,
    },
    {
        id: 5,
        image: similac1,
        name: "Similac Stage 1 Formula",
        description: "Similac Advance Stage 1 is a spray dried stage 1 infant milk substitute for infants up to 6 months. It is designed to support normal growth and development. Similac Advance contains Neuro-nutrients such as Omega 3 and 6 fatty acids [precursors of DHA and ARA], Choline, Iron, Taurine, Iodine, Folic Acid and Zinc that are known to support baby'S brain development. Level and blend of nucleotides that is known to support baby'S developing immune system.Calcium, Vitamin D and Phosphorus that are known to support baby'S bone development.Essential fatty acids, Vitamins, and Minerals (such as Calcium and Iron) that are known to support healthy growth of the baby.",
        rating: 100,
        discount: 25,
        salePrice: 856,
        offerPrice: 840,
        gender: "male",
        categories: ["fashion", "books"],
        colors: ["errorDark", "orangeDark", "errorMain", "secondaryMain"],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true,
    },
    {
        id: 6,
        image: similac1,
        name: "Similac Stage 1 Formula",
        description: "Similac Advance Stage 1 is a spray dried stage 1 infant milk substitute for infants up to 6 months. It is designed to support normal growth and development. Similac Advance contains Neuro-nutrients such as Omega 3 and 6 fatty acids [precursors of DHA and ARA], Choline, Iron, Taurine, Iodine, Folic Acid and Zinc that are known to support baby'S brain development. Level and blend of nucleotides that is known to support baby'S developing immune system.Calcium, Vitamin D and Phosphorus that are known to support baby'S bone development.Essential fatty acids, Vitamins, and Minerals (such as Calcium and Iron) that are known to support healthy growth of the baby.",
        rating: 100,
        discount: 25,
        salePrice: 856,
        offerPrice: 840,
        gender: "male",
        categories: ["fashion", "books"],
        colors: ["errorDark", "orangeDark", "errorMain", "secondaryMain"],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true,
    }
];

export default topBrandProducts;