import { useState, useEffect } from "react";
import faker from "faker";

const Main = () => {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		fetchImage();
	}, []);

	let reviews = [
		"5/10 - very creative with great problem solving skills.  Not recommended for working in a team, they like to be the centre of attention",
		"8/10 - always smartly dressed and on time for meetings.  Has their own laptop",
		"4/10 - bit of a superior attitude, gets fluff everywhere",
		"9/10 - highly qualified Cambridge graduate, thorough understanding of classics and media studies",
		"0/10 - not litter trained",
		"7/10 - a lot of experience for such a young cat",
		"3/10 - some attitude problems, doesn't get on well with others",
		"10/10 - highly recommend this fluffy boi",
	];

	const fetchImage = async () => {
		try {
			let response = await fetch(
				`https://api.thecatapi.com/v1/images/search?limit=8&page=100&order=DESC`
			);
			let data = await response.json();
			for (let i = 0; i < data.length; i++) {
				let item = data[i];
				item["name"] = faker.name.findName();
				item["cost"] = faker.commerce.price();
				item["job"] = faker.name.jobType();
				item["review"] = reviews[i];
			}
			setCats(data);
		} catch (e) {
			console.log(e);
		}
	};

	const pageProducts = "products";

	const pageCart = "cart";

	const [cart, setCart] = useState([]);

	const [page, setPage] = useState(pageProducts);

	const [total, setTotal] = useState(0);

	const addToCart = cat => {
		//to add selected item to cart
		setCart([...cart, cat]);
		setTotal(total + cat.cost);
	};

	const removeFromCart = (cat, index) => {
		//removes item from cart
		let cartItems = [...cart];
		cartItems.splice(index, 1);
		setCart(cartItems);
		setTotal(total - cat.cost);
	};

	const renderProducts = () => (
		//to display products
		<div className={"area_catCard"}>
			{cats.map((cat, index) => (
				<div className={"cat_card"} /* className="catcomponent" */ key={index}>
					<h2>{cat.name}</h2>

					<h4>{cat.job}</h4>

					<p>Price: £{cat.cost}</p>

          <img src={cat.url} alt="" />
        
					<p>
						{" "}
						<span>⭐</span>What people say about {cat.name}:
						<span className="review"> {cat.review}</span>
					</p>
					<button className={"btn_card"} onClick={() => addToCart(cat)}>
						Add to Cart
					</button>
				</div>
			))}
		</div>
	);
	const renderCart = () => (
		//to display cart items
		<div>
			<h2>Here are the fluffs in your cart...</h2>

			<h4>Your Cart Total is: £{parseInt(total)}</h4>

			<div className={"area_catCard_cart"}>
				{cart.map((cat, index) => {
					return (
						<div
							className={"cat_card_cart"}
							/* class="catcomponent" */ key={index}
						>
							<h2>{cat.name}</h2>

							<h4>{cat.job}</h4>

							<p>Price: £{parseInt(cat.cost)}</p>

							<img src={cat.url} alt="" />

							<button
								className={"btn_card_cart"}
								onClick={() => removeFromCart(cat, index)}
							>
								Remove from Cart
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);

	const navigateTo = nextPage => {
		//function to swap between cats and cart
		setPage(nextPage);
	};

	return (
		<div className="component">
			<header>
				<button className={"btn_cart"} onClick={() => navigateTo(pageCart)}>
					Go to Cart ({cart.length})
				</button>
				<button className={"btn_cart"} onClick={() => navigateTo(pageProducts)}>
					View Fluffs
				</button>
			</header>
			{page === pageProducts && renderProducts()}
			{page === pageCart && renderCart()}
		</div>
	);
};

export default Main;
