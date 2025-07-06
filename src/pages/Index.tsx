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

  // Fake auction timers
  const [auctionTimers, setAuctionTimers] = useState({
    "1": { hours: 2, minutes: 34, seconds: 18 },
    "2": { hours: 0, minutes: 45, seconds: 32 },
    "3": { hours: 1, minutes: 12, seconds: 55 },
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
    },
  ];

  const categories = [
    { name: "Электроника", icon: "Smartphone", color: "bg-blue-500" },
    { name: "Мода", icon: "Shirt", color: "bg-purple-500" },
    { name: "Дом", icon: "Home", color: "bg-green-500" },
    { name: "Авто", icon: "Car", color: "bg-red-500" },
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
                className="pl-10 pr-4 py-3 text-base"
              />
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Категории
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.name}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                      >
                        <Icon
                          name={category.icon}
                          className="text-white"
                          size={24}
                        />
                      </div>
                      <p className="font-medium text-gray-900">
                        {category.name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hot Auctions */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Горячие аукционы
              </h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {product.category}
                          </p>
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
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary">
                              {product.bids} ставок
                            </Badge>
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
            </div>
          </div>
        );

      case "auctions":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Все аукционы
            </h2>
            <div className="grid gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.category}
                        </p>
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
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{product.bids} ставок</Badge>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Участвовать
                          </Button>
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
            <Card>
              <CardContent className="p-6 text-center">
                <Icon
                  name="Package"
                  className="mx-auto mb-4 text-gray-400"
                  size={48}
                />
                <h3 className="text-lg font-semibold mb-2">Пока нет покупок</h3>
                <p className="text-gray-600 mb-4">
                  Участвуйте в аукционах или покупайте товары напрямую
                </p>
                <Button
                  onClick={() => setActiveTab("auctions")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Перейти к аукционам
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "sales":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Мои продажи</h2>
            <Card>
              <CardContent className="p-6 text-center">
                <Icon
                  name="Store"
                  className="mx-auto mb-4 text-gray-400"
                  size={48}
                />
                <h3 className="text-lg font-semibold mb-2">
                  Начните продавать
                </h3>
                <p className="text-gray-600 mb-4">
                  Создайте свой первый аукцион или разместите товар
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  Создать аукцион
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Уведомления</h2>
            <div className="space-y-3">
              <Card>
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
            <h1 className="text-xl font-bold text-blue-600">MarketPlace</h1>
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
              { key: "purchases", label: "Покупки", icon: "Package" },
              { key: "sales", label: "Продажи", icon: "Store" },
              { key: "notifications", label: "Уведомления", icon: "Bell" },
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
