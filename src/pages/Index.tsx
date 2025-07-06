import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [savedItems, setSavedItems] = useState(["1", "3"]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showProfile, setShowProfile] = useState(false);

  // Fake auction timers
  const [auctionTimers, setAuctionTimers] = useState({
    "1": { hours: 2, minutes: 34, seconds: 18 },
    "2": { hours: 0, minutes: 45, seconds: 32 },
    "3": { hours: 1, minutes: 12, seconds: 55 },
    "4": { hours: 3, minutes: 20, seconds: 45 },
    "5": { hours: 0, minutes: 15, seconds: 30 },
    "6": { hours: 4, minutes: 5, seconds: 12 },
  });

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctionTimers((prev) => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach((key) => {
          const timer = newTimers[key];
          if (timer.seconds > 0) {
            timer.seconds--;
          } else if (timer.minutes > 0) {
            timer.minutes--;
            timer.seconds = 59;
          } else if (timer.hours > 0) {
            timer.hours--;
            timer.minutes = 59;
            timer.seconds = 59;
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return `${time.hours.toString().padStart(2, "0")}:${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
  };

  const toggleSaved = (id) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const products = [
    {
      id: "1",
      title: "iPhone 15 Pro Max",
      price: 125000,
      currentBid: 98000,
      image: "/img/164ce35e-0e95-40cd-a33c-0a2f7a31ed5d.jpg",
      category: "Электроника",
      bids: 24,
      isAuction: true,
      shipping: "Бесплатная доставка",
      seller: "apple_store_official",
      rating: 4.9,
      condition: "Новое",
    },
    {
      id: "2",
      title: "Rolex Submariner",
      price: 850000,
      currentBid: 620000,
      image: "/img/645f669f-f6e9-4565-ab87-370806d6c308.jpg",
      category: "Часы",
      bids: 15,
      isAuction: true,
      shipping: "Доставка 1-3 дня",
      seller: "luxury_watches",
      rating: 4.8,
      condition: "Б/у - отличное",
    },
    {
      id: "3",
      title: "Nike Air Jordan 4",
      price: 35000,
      currentBid: 28000,
      image: "/img/78f624c6-d57c-4f46-a2e2-159a8dea847d.jpg",
      category: "Обувь",
      bids: 8,
      isAuction: true,
      shipping: "Бесплатная доставка",
      seller: "sneaker_kingdom",
      rating: 4.7,
      condition: "Новое",
    },
    {
      id: "4",
      title: "Chanel Classic Flap",
      price: 450000,
      currentBid: 380000,
      image: "/img/ced00774-20a3-444b-a883-adfe5929cf76.jpg",
      category: "Мода",
      bids: 12,
      isAuction: true,
      shipping: "Доставка 2-5 дней",
      seller: "fashion_house",
      rating: 4.9,
      condition: "Б/у - хорошее",
    },
    {
      id: "5",
      title: "Vintage Canon AE-1",
      price: 25000,
      currentBid: 18000,
      image: "/img/8772170e-a27c-4952-92fd-f23caa7835bf.jpg",
      category: "Коллекционирование",
      bids: 6,
      isAuction: true,
      shipping: "Самовывоз",
      seller: "vintage_cameras",
      rating: 4.6,
      condition: "Б/у - хорошее",
    },
    {
      id: "6",
      title: "Gaming Headset RGB",
      price: 15000,
      currentBid: 12000,
      image: "/img/68b5ff33-3149-43e4-b641-7d6bbcdccfa4.jpg",
      category: "Игры",
      bids: 18,
      isAuction: true,
      shipping: "Бесплатная доставка",
      seller: "gaming_zone",
      rating: 4.5,
      condition: "Новое",
    },
  ];

  const categories = [
    {
      name: "Электроника",
      icon: "Smartphone",
      color: "bg-blue-500",
      key: "electronics",
    },
    { name: "Мода", icon: "Shirt", color: "bg-purple-500", key: "fashion" },
    { name: "Дом", icon: "Home", color: "bg-green-500", key: "home" },
    { name: "Авто", icon: "Car", color: "bg-red-500", key: "auto" },
    { name: "Спорт", icon: "Trophy", color: "bg-orange-500", key: "sports" },
    { name: "Игры", icon: "Gamepad2", color: "bg-indigo-500", key: "games" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12 py-3 text-base"
              />
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon name="Filter" size={20} />
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <Card className="p-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Фильтры</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === "all"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Все
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category.key
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Категории
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <Card
                    key={category.name}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category.key);
                      setActiveTab("auctions");
                    }}
                  >
                    <CardContent className="p-3 text-center">
                      <div
                        className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                      >
                        <Icon
                          name={category.icon}
                          className="text-white"
                          size={20}
                        />
                      </div>
                      <p className="font-medium text-gray-900 text-sm">
                        {category.name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hot Auctions */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Горячие аукционы
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("auctions")}
                >
                  Все
                </Button>
              </div>
              <div className="space-y-4">
                {filteredProducts.slice(0, 3).map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => toggleSaved(product.id)}
                            className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm"
                          >
                            <Icon
                              name={
                                savedItems.includes(product.id)
                                  ? "Heart"
                                  : "Heart"
                              }
                              size={16}
                              className={
                                savedItems.includes(product.id)
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-400"
                              }
                            />
                          </button>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {product.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-gray-600">
                              {product.category}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {product.condition}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <p className="text-sm text-gray-500">
                                Текущая ставка
                              </p>
                              <p className="font-bold text-lg text-blue-600">
                                {product.currentBid.toLocaleString()} ₽
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Осталось</p>
                              <p className="font-mono text-lg text-red-500">
                                {formatTime(auctionTimers[product.id])}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                {product.bids} ставок
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Icon
                                  name="Star"
                                  size={12}
                                  className="text-yellow-500 fill-yellow-500"
                                />
                                <span className="text-xs text-gray-600">
                                  {product.rating}
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Сделать ставку
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {product.shipping}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case "auctions":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Все аукционы
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Icon name="Filter" size={20} className="text-gray-600" />
              </button>
            </div>

            {showFilters && (
              <Card className="p-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Фильтры</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === "all"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Все
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category.key
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            <div className="grid gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => toggleSaved(product.id)}
                          className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm"
                        >
                          <Icon
                            name={
                              savedItems.includes(product.id)
                                ? "Heart"
                                : "Heart"
                            }
                            size={16}
                            className={
                              savedItems.includes(product.id)
                                ? "text-red-500 fill-red-500"
                                : "text-gray-400"
                            }
                          />
                        </button>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {product.condition}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              Текущая ставка
                            </p>
                            <p className="font-bold text-xl text-blue-600">
                              {product.currentBid.toLocaleString()} ₽
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Осталось</p>
                            <p className="font-mono text-lg text-red-500">
                              {formatTime(auctionTimers[product.id])}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {product.bids} ставок
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Icon
                                name="Star"
                                size={12}
                                className="text-yellow-500 fill-yellow-500"
                              />
                              <span className="text-xs text-gray-600">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Участвовать
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            {product.shipping}
                          </p>
                          <p className="text-xs text-gray-500">
                            @{product.seller}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "purchases":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Мои покупки</h2>

            {/* Purchase Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="flex-1 py-2 px-4 rounded-md bg-white text-gray-900 font-medium shadow-sm">
                Покупки
              </button>
              <button className="flex-1 py-2 px-4 rounded-md text-gray-600 font-medium">
                Ставки
              </button>
            </div>

            {/* Recent Purchases */}
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src="/img/68b5ff33-3149-43e4-b641-7d6bbcdccfa4.jpg"
                      alt="Gaming Headset"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Gaming Headset RGB
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Куплено 15 июня 2024
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Цена покупки</p>
                          <p className="font-bold text-green-600">12,000 ₽</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            <Icon name="Check" size={12} className="mr-1" />
                            Доставлено
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src="/img/8772170e-a27c-4952-92fd-f23caa7835bf.jpg"
                      alt="Vintage Camera"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Vintage Canon AE-1
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Куплено 10 июня 2024
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Цена покупки</p>
                          <p className="font-bold text-green-600">18,000 ₽</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            <Icon name="Truck" size={12} className="mr-1" />В
                            пути
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Purchase Stats */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Статистика
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon
                        name="ShoppingBag"
                        className="text-white"
                        size={20}
                      />
                    </div>
                    <h4 className="font-bold text-2xl text-gray-900">2</h4>
                    <p className="text-sm text-gray-600">Покупок за месяц</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon
                        name="DollarSign"
                        className="text-white"
                        size={20}
                      />
                    </div>
                    <h4 className="font-bold text-2xl text-gray-900">30K</h4>
                    <p className="text-sm text-gray-600">Потрачено всего</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "sales":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Мои продажи
              </h2>
              <Button className="bg-green-600 hover:bg-green-700" size="sm">
                <Icon name="Plus" size={16} className="mr-1" />
                Новый аукцион
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="Gavel" className="text-white" size={24} />
                  </div>
                  <h3 className="font-medium text-gray-900">Создать аукцион</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Продажа с торгами
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="Tag" className="text-white" size={24} />
                  </div>
                  <h3 className="font-medium text-gray-900">Продать сразу</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Фиксированная цена
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Active Listings */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Активные объявления
              </h3>
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src="/img/164ce35e-0e95-40cd-a33c-0a2f7a31ed5d.jpg"
                        alt="iPhone 15 Pro Max"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          iPhone 15 Pro Max
                        </h4>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              Текущая ставка
                            </p>
                            <p className="font-bold text-blue-600">98,000 ₽</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Осталось</p>
                            <p className="font-mono text-red-500">2:34:18</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">24 ставки</Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Eye" size={14} />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src="/img/78f624c6-d57c-4f46-a2e2-159a8dea847d.jpg"
                        alt="Nike Air Jordan 4"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Nike Air Jordan 4
                        </h4>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              Текущая ставка
                            </p>
                            <p className="font-bold text-blue-600">28,000 ₽</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Осталось</p>
                            <p className="font-mono text-red-500">1:12:55</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">8 ставок</Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Eye" size={14} />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sales Stats */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Статистика продаж
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon
                        name="TrendingUp"
                        className="text-white"
                        size={20}
                      />
                    </div>
                    <h4 className="font-bold text-2xl text-gray-900">2</h4>
                    <p className="text-sm text-gray-600">Активные лоты</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon
                        name="DollarSign"
                        className="text-white"
                        size={20}
                      />
                    </div>
                    <h4 className="font-bold text-2xl text-gray-900">5</h4>
                    <p className="text-sm text-gray-600">Продано за месяц</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "saved":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Избранное</h2>
            {savedItems.length > 0 ? (
              <div className="space-y-4">
                {products
                  .filter((p) => savedItems.includes(p.id))
                  .map((product) => (
                    <Card
                      key={product.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => toggleSaved(product.id)}
                              className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm"
                            >
                              <Icon
                                name="Heart"
                                size={16}
                                className="text-red-500 fill-red-500"
                              />
                            </button>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {product.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <p className="text-sm text-gray-600">
                                {product.category}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {product.condition}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Текущая ставка
                                </p>
                                <p className="font-bold text-lg text-blue-600">
                                  {product.currentBid.toLocaleString()} ₽
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  Осталось
                                </p>
                                <p className="font-mono text-lg text-red-500">
                                  {formatTime(auctionTimers[product.id])}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                  {product.bids} ставок
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Icon
                                    name="Star"
                                    size={12}
                                    className="text-yellow-500 fill-yellow-500"
                                  />
                                  <span className="text-xs text-gray-600">
                                    {product.rating}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Сделать ставку
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Icon
                    name="Heart"
                    className="mx-auto mb-4 text-gray-400"
                    size={48}
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    Нет сохраненных товаров
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Нажмите на сердечко чтобы сохранить товар
                  </p>
                  <Button
                    onClick={() => setActiveTab("auctions")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Перейти к аукционам
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Уведомления
              </h2>
              <Button variant="outline" size="sm">
                Отметить все
              </Button>
            </div>
            <div className="space-y-3">
              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Icon name="Gavel" className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Новая ставка в аукционе</p>
                      <p className="text-sm text-gray-600">
                        iPhone 15 Pro Max - 99,000 ₽
                      </p>
                      <p className="text-xs text-gray-500">2 минуты назад</p>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon name="Check" className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Платеж подтвержден</p>
                      <p className="text-sm text-gray-600">
                        Оплата за Nike Air Jordan 4
                      </p>
                      <p className="text-xs text-gray-500">1 час назад</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Icon name="Clock" className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Аукцион завершается</p>
                      <p className="text-sm text-gray-600">
                        Rolex Submariner - 30 минут до конца
                      </p>
                      <p className="text-xs text-gray-500">Вчера</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Icon name="Heart" className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Товар сохранен</p>
                      <p className="text-sm text-gray-600">
                        Chanel Classic Flap добавлен в избранное
                      </p>
                      <p className="text-xs text-gray-500">2 часа назад</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">eBay</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon name="Bell" size={24} className="text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Icon name="User" className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-20">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around py-2">
            {[
              { key: "home", label: "Главная", icon: "Home" },
              { key: "auctions", label: "Аукционы", icon: "Gavel" },
              { key: "saved", label: "Избранное", icon: "Heart" },
              { key: "purchases", label: "Покупки", icon: "Package" },
              { key: "notifications", label: "Оповещения", icon: "Bell" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon name={tab.icon} size={20} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
                {tab.key === "notifications" && notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
