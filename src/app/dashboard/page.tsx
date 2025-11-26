"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Calendar,
  Activity,
  Bell,
  User,
  Home,
  TrendingUp,
  Clock,
  Pill,
  Utensils,
  Footprints,
  Award,
} from "lucide-react";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("home");

  const stats = [
    {
      icon: Heart,
      label: "Saúde",
      value: "Ótima",
      color: "text-pink-400",
      bgColor: "bg-pink-50",
    },
    {
      icon: Activity,
      label: "Atividade",
      value: "85%",
      color: "text-blue-400",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      label: "Humor",
      value: "Feliz",
      color: "text-green-400",
      bgColor: "bg-green-50",
    },
    {
      icon: Award,
      label: "Nível",
      value: "12",
      color: "text-purple-400",
      bgColor: "bg-purple-50",
    },
  ];

  const alerts = [
    {
      icon: Pill,
      title: "Medicamento",
      time: "14:00",
      description: "Dar remédio para pulgas",
      color: "text-red-400",
    },
    {
      icon: Utensils,
      title: "Alimentação",
      time: "18:00",
      description: "Jantar do Max",
      color: "text-orange-400",
    },
    {
      icon: Footprints,
      title: "Passeio",
      time: "19:30",
      description: "Caminhada noturna",
      color: "text-blue-400",
    },
  ];

  const activities = [
    { time: "09:00", activity: "Café da manhã", icon: "🍽️" },
    { time: "10:30", activity: "Passeio matinal", icon: "🦮" },
    { time: "12:00", activity: "Brincadeira", icon: "🎾" },
    { time: "14:00", activity: "Soneca", icon: "😴" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Olá, Maria! 👋</h1>
              <p className="text-gray-500 text-sm">Como está o Max hoje?</p>
            </div>
            <button className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* Pet Profile Card */}
        <Card className="bg-gradient-to-r from-blue-400 to-purple-400 text-white p-6 mb-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl">
              🐕
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Max</h2>
              <p className="text-blue-100">Golden Retriever • 3 anos</p>
            </div>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-full"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-4 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className={`${stat.bgColor} rounded-full w-12 h-12 flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Alerts Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-400" />
            Lembretes de Hoje
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <Card
                  key={index}
                  className="p-4 rounded-2xl hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-6 h-6 ${alert.color}`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                      <p className="text-gray-500 text-sm">{alert.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{alert.time}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Atividades de Hoje
          </h3>
          <Card className="p-6 rounded-2xl">
            <div className="space-y-4">
              {activities.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.activity}</p>
                    <p className="text-gray-500 text-sm">{item.time}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {[
              { icon: Home, label: "Início", id: "home" },
              { icon: Activity, label: "Atividade", id: "activity" },
              { icon: Calendar, label: "Rotina", id: "routine" },
              { icon: Heart, label: "Saúde", id: "health" },
              { icon: User, label: "Perfil", id: "profile" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-purple-400 bg-purple-50"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
