const db = require('./server/db');
const Product = require('./server/db/models/product');
const Category = require('./server/db/models/category');

const categories = [{
  name: 'Romance',
}, {
  name: 'Surprises',
}, {
  name: 'Lows',
}, {
  name: 'Comfort',
}];

const products = [{
    title: 'Approval From Your Parents',
    description: 'Parents aren\'t always easy to please. As soon as you open this jar, you\'ll immediately experience the love and admiration from proud parents. Enjoy it while it lasts.',
    price: 99.99,
    quantityAvailable: 14,
    photo: '/raspberry.png'
}, {
    title: 'Bear Hugs',
    description: 'You know, the warm, fuzzy kind of hug that you can just melt into?',
    price: 4.50,
    quantityAvailable: 25,
    photo: '/brown.png'
}, {
    title: 'Your Fondest Memories',
    description: 'Kinda like the robot boy from the movie, AI, finally being able to fall asleep because the aliens dug into his memories so he could relive his fondest memory. You know the movie with Jude Law? By the way, have you seen the grown up version of that kid tho? Wow, what happened?',
    price: 3.99,
    quantityAvailable: 28,
    photo: '/citrus.png'
}, {
    title: 'First Kiss',
    description: '"And it\'s all coming back to me..."',
    price: 16.50,
    quantityAvailable: 19,
    photo: '/teal.png'
}, {
    title: 'Tears of Your Enemies',
    description: 'Enjoy the tears of those who have ever wronged you. Revel in their sorrow and heartache and may they grovel at your feet.',
    price: 149.99,
    quantityAvailable: 15,
    photo: '/ocean.png'
}, {
    title: 'Good Fortune',
    description: 'Not your everyday fortune cookie -- we\'re talking some serious good luck.',
    price: 25.00,
    quantityAvailable: 44,
    photo: 'neonyellow.png'
}, {
    title: 'Celebrity Sighting',
    description: 'Remember that time you were walking down Fifth Avenue and you saw Beyonce? And you both made eye contact and she smiled at you?! O. M. G...',
    price: 14.50,
    quantityAvailable: 60,
    photo: 'olive.png'
}, {
    title: 'Good Vibes',
    description: 'Beach and a Mai Tai? Acoustic guitar? Summer roadtrip? Whatever floats your boat!',
    price: 3.99,
    quantityAvailable: 86,
    photo: 'orange.png'
}, {
    title: 'The Smell of Freshly Baked Cookies',
    description: 'Someone is in for a treat! Wait just a few seconds longer for them to cool down.',
    price: 1.99,
    quantityAvailable: 250,
    photo: '/brown.png'
}, {
    title: 'Campfire Conversations',
    description: 'Good company, smores and an all-nighter under the stars.',
    price: 7.50,
    quantityAvailable: 36,
    photo: '/olive.png'
}, {
    title: 'The Answer to Your Prayers',
    description: 'Feeling hopeless? Need a miracle? Here is the Answer to Your Prayers.',
    price: 19.00,
    quantityAvailable: 65,
    photo: '/grape.png'
}, {
    title: 'Uncontrollable Laughter',
    description: 'That time of night when just everything is funny.',
    price: 5.50,
    quantityAvailable: 75,
    photo: 'orange.png'
}, {
    title: 'Beginner\'s Luck',
    description: 'Wow, is this really your first time? You\'re a natural! I\'ve never seen someone be so good at something.',
    price: 15.75,
    quantityAvailable: 53,
    photo: '/teal.png'
}, {
    title: 'A Text from Your Crush',
    description: 'Do your eyes deceive you? Could it really be? Yes, that\'s a text message from your crush. Your heart melts, birds begin to sing, and everything bad in your life fades away. (This jar perfectly pairs with "Always Saying the Right Things").',
    price: 29.99,
    quantityAvailable: 37,
    photo: '/lilac.png'
}, {
    title: 'Cat Purrs',
    description: 'Relaxing vibrations from your furry best friend (cat not included)',
    price: 9.90,
    quantityAvailable: 20,
    photo: '/green.png'
}, {
    title: 'The Game Winning Shot',
    description: 'There are seconds left on the clock, and everything is on the line. All eyes are on you... will you be the hero?',
    price: 68.50,
    quantityAvailable: 30,
    photo: 'pumpkin.png'
}, {
    title: 'Debt Free',
    description: 'Yes, you\'ll be more in debt after buying Debt Free, but at least you\'ll be in the green for a split second.',
    price: 2168.00,
    quantityAvailable: 340,
    photo: '/green.png'
}, {
    title: 'Quiet Rainy Afternoons',
    description: 'The soothing sound of rain drops sets the perfect ambience for you to get in touch your mind, body and soul. Take this time to reflect and relax.',
    price: 16.50,
    quantityAvailable: 72,
    photo: '/ocean.png'
}, {
    title: 'Jar of Crippling Depression',
    description: 'Surprise! You have 5 minutes to live. And you\'ve got 5 seconds of oxygen left.',
    price: 1.99,
    quantityAvailable: 89,
    photo: '/black.png'
}, {
    title: 'Heartbreak',
    description: 'When everything in life is going right, something has to be wrong. Here\'s a reality check to make sure you\'re still alive! It\'s going to hurt, but everyone needs their heart broken every once in a while.',
    price: 2.50,
    quantityAvailable: 16,
    photo: '/red.png'
}, {
    title: 'Acknowledgement from Your Boss',
    description: 'Working late? Going above and beyond? Not getting the recognition you deserve? Here\'s your chance to hear about how much of an asset you are to the company. Hey, you might even get that raise.',
    price: 15.00,
    quantityAvailable: 27,
    photo: '/mustard.png'
}, {
    title: 'Coming to Terms With Death',
    description: 'Life isn\'t fair. Go out knowing you\'ve done the best you could and that you\'ve made a difference. God speed.',
    price: 29.00,
    quantityAvailable: 67,
    photo: '/grape.png'
}, {
    title: '5 More Minutes of Sleep',
    description: 'Snoozing that alarm never felt so good.',
    price: 6.50,
    quantityAvailable: 105,
    photo: '/blue.png'
}, {
    title: 'Saying All the Right Things',
    description: 'Funny. Witty. Smart. Your words are as smooth as butter and everything you say is just pure gold.',
    price: 14.99,
    quantityAvailable: 78,
    photo: '/maroon.png'
}, {
    title: 'A Sense of Humor',
    description: 'Your jokes make other people feel uncomfortable. Like really uncomfortable. You need this. Seriously.',
    price: 63.00,
    quantityAvailable: 30,
    photo: '/grape.png'
}, {
    title: 'Good Hair Day',
    description: 'Wow, you have never looked so good! Confidence, self-worth, and overall happiness come with this jar.',
    price: 34.25,
    quantityAvailable: 44,
    photo: '/lilac.png'
}, {
    title: 'Breakfast In Bed',
    description: 'You wake up. There are warm, fluffy, buttery pancakes cooked just the way you like em right next to you. Wait, are those chocolate chip pancakes? And bacon?!',
    price: 15.00,
    quantityAvailable: 25,
    photo: '/citrus.png'
}, {
    title: 'Good Reflexes',
    description: 'That feeling when you drop your phone, and right before it smashes into the ground to shatter into a million pieces and then explode into a ball of fire - killing millions, YOU CATCH IT! WOOOOO that was close! Yeah, we have that feeling in jar.',
    price: 44.50,
    quantityAvailable: 12,
    photo: '/grape.png'
}, {
    title: 'Not Being the Biggest F***up at the Family Gathering',
    description: 'You know that cousin your mother always compared you to growing up? Yes, the one who graduated from Harvard, married a model and is a doctor? Yeah, he just got arrested for something unspeakable. Guess you\'re not the biggest f***up afterall',
    price: 6.50,
    quantityAvailable: 69,
    photo: '/mustard.png'
}, {
    title: 'Getting Picked First in Dodgeball',
    description: 'Your asthma, scrawny arms, and overall un-athleticism is now your greatest asset. EVERYONE is fighting to have you on their team.',
    price: 2.25,
    quantityAvailable: 88,
    photo: '/olive.png'
}, {
    title: 'Sweet Revenge',
    description: 'Oh sweet, sweet revenge! This is the revenge that\'s so sweet you can eat it for dessert!',
    price: 99.00,
    quantityAvailable: 6,
    photo: '/red.png'
}, {
    title: '0% Chance of Rain',
    description: 'Having an outdoor wedding? This is priceless.',
    price: 49.99,
    quantityAvailable: 203,
    photo: '/blue.png'
}, {
    title: 'Your Father\'s Approval',
    description: 'Maybe it\'ll never really happen, but at least you\'ll know what it feels like with this rare jar. Get it now while supplies last!',
    price: 120.00,
    quantityAvailable: 5,
    photo: '/maroon.png'
}, {
    title: 'That One Time at Band Camp',
    description: 'What happens at band camp ... stays at band camp.',
    price: 26.50,
    quantityAvailable: 335,
    photo: '/neonyellow.png'
}, {
    title: 'Your Crush Confessing Their Love to You',
    description: 'Whoa, that was unexpected. This never happened before and you can not believe it. Your crush felt exactly the same way about you. Is this real life? No, but it can be... kinda? Buy me.',
    price: 50.00,
    quantityAvailable: 60,
    photo: '/raspberry.png'
}, {
    title: 'Questioning Your Life\'s Decisions',
    description: 'You know when your brain suddenly decides to remember something really embarrassing/irresponsible/stupid that you did a really, really long time ago? Yeah, so, that.',
    price: 4.50,
    quantityAvailable: 97,
    photo: '/plum.png'
}, {
    title: 'A Home Run',
    description: 'And the crowd goes wild!',
    price: 22.00,
    quantityAvailable: 26,
    photo: '/orange.png'
}, {
    title: 'Christmas Carols',
    description: 'It\'s the most wonderful time of the year!',
    price: 9.99,
    quantityAvailable: 221,
    photo: '/red.png'
}, {
    title: 'Financial Stability',
    description: 'You got 99 problems and money aint one! Someone is going to retire very early. Good for you!',
    price: 225.00,
    quantityAvailable: 11,
    photo: '/plum.png'
}, {
    title: 'The Nomad Life',
    description: 'No more bills. No more rent. No more showers... Nomadic life is true freedom.',
    price: 12.00,
    quantityAvailable: 25,
    photo: '/mustard.png'
}, {
    title: 'A Day Off',
    description: 'Our scientists have concocted a perfect semblance of a day at home in your sweatpants, even if you\'ve got the busiest day of your life going on.',
    price: 101.00,
    quantityAvailable: 112,
    photo: '/green.png'
}, {
    title: 'Embarrassing Moments With No Witnesses',
    description: 'Ever trip on your own feet and look around to see if anyone saw it? And no one actually did? Nice. ',
    price: 5.00,
    quantityAvailable: 7,
    photo: '/neonyellow.png'
}, {
    title: 'Forgive & Forget',
    description: 'Or so they say.',
    price: 11.00,
    quantityAvailable: 13,
    photo: '/lilac.png'
}, {
    title: 'Overcoming Your Daddy Issues',
    description: 'More hugs. More "I love you\'s". More of everything... in a jar!',
    price: 36.50,
    quantityAvailable: 29,
    photo: '/raspberry.png'
}, {
    title: 'Snow On Your Eyelashes',
    description: 'Cue Sound of Music\'s "These are a few of my favorite things".',
    price: 5.75,
    quantityAvailable: 40,
    photo: '/gray.png'
}, {
    title: 'Finally Getting Closure',
    description: 'Can\'t believe it ended the way it did? We know, and you deserve better than that. Open the jar and get all the answers you need to make peace and move on with your life.',
    price: 23.50,
    quantityAvailable: 25,
    photo: '/ocean.png'
}, {
    title: 'Thinking You\'re Late But You\'re Actually Early',
    description: 'Oh no! You overslept and you\'re going to be late to that important meeting. You rush and hope nobody notices how late you are. But they do notice -- they ALL notice . . . how EARLY you are! Wow, you\'re early! You must be a hard worker. You\'ve just earned everyone\'s respect. And a raise.',
    price: 8.99,
    quantityAvailable: 45,
    photo: '/citrus.png'
}];

const seed = () =>
  Promise.all(categories.map(category =>
    Category.create(category))
  )
  .then(() =>
  Promise.all(products.map(product =>
    Product.create(product))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
