const sampleMenu = [
    {
      title: "Tea",
      description:
        "Tea is the magic key to the vault where my brain is kept.",
      image: {
        filename: "menuimage",
        url: "https://media.istockphoto.com/id/864607392/photo/image-of-a-glass-of-tea-in-street-market.jpg?s=1024x1024&w=is&k=20&c=7-gsmCWyBemLsQKKehJGtdMowlIkqK3lhQZCH7umuRc=",
      },
      price: 10,
    },
    {
        title: "Black Tea",
        description:
        "“A cup of black tea makes everything better strong, simple, soulful.",
        image: {
          filename: "menuimage",
          url: "https://media.istockphoto.com/id/1253607563/photo/fresh-organic-aromatic-black-tea-in-the-glass-cup-on-light-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=g45qG1Y3Lq0Lv2cthxcxZVxt74G3aTOG7x0ENgPyPzs=",
        },
        price: 15,
      },
      {
        title: "Classic Maggi",
        description:
        "Maggi – because good things come in two minutes Maggi.",

        image: {
          filename: "menuimage",
          url: "https://media.istockphoto.com/id/638239408/photo/aceh-noodles.jpg?s=1024x1024&w=is&k=20&c=w872ig_Zcv854fsuGzXSfm-Ljj3lqUQZWzQWyLHlMq0=",
        },
        price: 40,
      },
      {
        title: "Vada Pav",
        description:
        "Spicy, crispy, and oh-so-satisfying — that’s Vada Pav for you!",

        image: {
          filename: "menuimage",
          url: "https://media.istockphoto.com/id/1433411975/photo/vada-pav-or-wada-pao-indian-potato-sandwich.jpg?s=1024x1024&w=is&k=20&c=x69bDTGnZ5qp4k0c4Vx2zXL9kmG5IK7WTz-T0XY-F9U=",
        },
        price: 20,
      },
      {
        title: "Salted Fries",
        description:
        "Crispy, golden fries lightly seasoned with sea salt a timeless favorite.",

        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNhbHRlZCUyMGZyaWVzfGVufDB8fDB8fHww",
        },
        price: 60,
      },
      {
        title: "Bun Maska",
        description:
        "Toasted bun with a rich layer of butter a classic tea-time favorite.",

        image: {
          filename: "menuimage",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWN389Pso_9IaCSYWM-R3pdnwJMwrnoCR-vQ&s",
        },
        price: 40,
      },
      {
        title: "Hot Milk",
        description:
        "Warm, comforting milk served fresh – perfect for a cozy sip.",

        image: {
          filename: "menuimage",
          url: "https://media.istockphoto.com/id/2167497267/photo/cup-of-coffee-with-milk.jpg?s=1024x1024&w=is&k=20&c=sGNABFT0Yg_t4W2VHSh63AlVVBgNKN5jJI0Kg0Im1kY=",
        },
        price: 25,
      },
      {
        title: "Hot Coffee",
        description:
        "Freshly brewed, rich and aromatic – a perfect energizing pick-me-up.",

        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1703418075559-d97c3f74f923?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        price: 20,
      },
      {
        title: "Cold Coffee",
        description:
        "Chilled, creamy blend of coffee and milk – smooth, refreshing, and energizing.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1530373239216-42518e6b4063?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D",
        },
        price: 50,
      },
      {
        title: "Bread Butter",
        description:
        "Soft bread slices generously layered with smooth, creamy butter – simple and delicious.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1619095956510-24c12e2c4b9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWQlMjBidXR0ZXJ8ZW58MHx8MHx8fDA%3D",
        },
        price: 30,
      },
      {
        title: "Bread Butter Jam",
        description:
        "Fresh bread layered with creamy butter and sweet, fruity jam – delightful anytime snack.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1623735878517-90d8793a93d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJyZWFkJTIwYnV0dGVyJTIwamFtfGVufDB8fDB8fHww",
        },
        price: 40,
      },
      {
        title: "Plain Veg Sandwich",
        description:
        "Fresh veggies layered between soft bread slices – light, healthy, and satisfying.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhaW4lMjB2ZWclMjBzYW5kd2ljaHxlbnwwfHwwfHx8MA%3D%3D",
        },
        price: 40,
      },
      {
        title: "Paneer Sandwich",
        description:
        "Spicy tandoori paneer veggies in grilled bread bold and flavorful bite.",
        image: {
          filename: "menuimage",
          url: "https://plus.unsplash.com/premium_photo-1739142431087-f8768ff66b57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFuZG9vcmklMjBwYW5lZXIlMjAlMjBzYW5kd2ljaHxlbnwwfHwwfHx8MA%3D%3D",
        },
        price: 90,
      },
      {
        title: "Aloo Tikki Burger",
        description:
        "Crispy aloo tikki with fresh veggies in a soft burger bun – satisfying treat.",
        image: {
          filename: "menuimage",
          url: "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFsb28lMjB0aWtpJTIwYnVyZ2VyfGVufDB8fDB8fHww",
        },
        price: 40,
      },
      {
        title: "Veg Burger",
        description:
        "Crunchy veggie patty with lettuce, tomato, and sauce in a toasted bun.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmVnJTIwYnVyZ2VyfGVufDB8fDB8fHww",
        },
        price: 70,
      },
      {
        title: "Strawberry",
        description:
        "Creamy blend of fresh strawberries and milk – sweet, smooth, and refreshing.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1611928237590-087afc90c6fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3RyYXdiZXJyeSUyMG1pbGtzaGFrZXxlbnwwfHwwfHx8MA%3D%3D",
        },
        price: 69,
      },
      {
        title: "Mango",
        description:
        "Thick, creamy blend of ripe mangoes and milk – tropical, sweet, and refreshing.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1607781143257-c6fcb0613a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU4fHx8ZW58MHx8fHx8",
        },
        price: 69,
      },
      {
        title: "Vanilla",
        description:
        "Smooth and creamy vanilla-flavored shake – classic, cool, and perfectly sweetened.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1555411093-41f7864ed3a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZhbmlsYSUyMG1pbGtzaGFrfGVufDB8fDB8fHww",
        },
        price: 69,
      },
      {
        title: "Chocolate",
        description:
        "Rich and creamy chocolate blend – indulgent, smooth, and delightfully refreshing.",
        image: {
          filename: "menuimage",
          url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hvY29sYXRlJTIwbWlsa3NoYWt8ZW58MHx8MHx8fDA%3D",
        },
        price: 69,
      },
]

module.exports = {data : sampleMenu};