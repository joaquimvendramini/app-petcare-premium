"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Calendar, Activity, ArrowRight, ArrowLeft, User, Dog, Camera, Stethoscope, Brain, Home, Bell } from "lucide-react";

type OnboardingStep = "welcome" | "tutor" | "petType" | "petInfo" | "health" | "behavior" | "routine" | "notifications";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [welcomeSlide, setWelcomeSlide] = useState(0);

  // Form data
  const [formData, setFormData] = useState({
    // Tutor
    tutorName: "",
    experienceLevel: "",
    // Pet Type
    petType: "",
    // Pet Info
    petName: "",
    petPhoto: "",
    breed: "",
    ageGroup: "",
    weight: "",
    // Health
    hasHealthCondition: "",
    healthConditionDetails: "",
    vaccinesUpToDate: "",
    takesMedication: "",
    // Behavior
    behaviorType: [] as string[],
    behaviorProblems: [] as string[],
    behaviorProblemsOther: "",
    // Routine
    walkFrequency: "",
    foodType: "",
    feedingTimes: [] as string[],
    // Notifications
    reminderPreference: "",
    careTracking: [] as string[],
  });

  const welcomeSlides = [
    {
      icon: Heart,
      title: "Bem-vindo ao MyPetCare",
      description: "Acompanhe a saúde, comportamento e rotina do seu pet em um único lugar",
      color: "text-pink-400",
      bgColor: "bg-pink-50",
      emoji: "🐕",
    },
    {
      icon: Activity,
      title: "Monitore o Comportamento",
      description: "Registre atividades, humor e comportamentos do seu amigo peludo",
      color: "text-blue-400",
      bgColor: "bg-blue-50",
      emoji: "🐱",
    },
    {
      icon: Calendar,
      title: "Organize a Rotina",
      description: "Crie lembretes para alimentação, passeios, medicamentos e muito mais",
      color: "text-green-400",
      bgColor: "bg-green-50",
      emoji: "🐰",
    },
    {
      icon: Heart,
      title: "Cuide da Saúde",
      description: "Mantenha o histórico médico, vacinas e consultas sempre à mão",
      color: "text-purple-400",
      bgColor: "bg-purple-50",
      emoji: "🐾",
    },
  ];

  const handleWelcomeNext = () => {
    if (welcomeSlide < welcomeSlides.length - 1) {
      setWelcomeSlide(welcomeSlide + 1);
    } else {
      setCurrentStep("tutor");
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const handleNext = () => {
    const steps: OnboardingStep[] = ["tutor", "petType", "petInfo", "health", "behavior", "routine", "notifications"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    const steps: OnboardingStep[] = ["welcome", "tutor", "petType", "petInfo", "health", "behavior", "routine", "notifications"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const toggleArrayValue = (field: keyof typeof formData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      setFormData({ ...formData, [field]: currentArray.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...currentArray, value] });
    }
  };

  // Welcome slides
  if (currentStep === "welcome") {
    const currentSlideData = welcomeSlides[welcomeSlide];
    const Icon = currentSlideData.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
        <div className="p-6 flex justify-end">
          {welcomeSlide < welcomeSlides.length - 1 && (
            <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
              Pular
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <div className={`${currentSlideData.bgColor} rounded-full p-12 mb-8 transition-all duration-500 transform hover:scale-105`}>
            <Icon className={`w-24 h-24 ${currentSlideData.color}`} strokeWidth={1.5} />
          </div>

          <div className="mb-8 text-6xl animate-bounce">{currentSlideData.emoji}</div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            {currentSlideData.title}
          </h1>

          <p className="text-gray-600 text-center text-lg max-w-md mb-12 leading-relaxed">
            {currentSlideData.description}
          </p>

          <div className="flex gap-2 mb-8">
            {welcomeSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === welcomeSlide ? "w-8 bg-blue-400" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleWelcomeNext}
            size="lg"
            className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-12 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {welcomeSlide < welcomeSlides.length - 1 ? (
              <>
                Próximo
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            ) : (
              "Começar"
            )}
          </Button>
        </div>

        <div className="pb-8 text-center">
          <p className="text-gray-400 text-sm">Feito com 💜 para você e seu pet</p>
        </div>
      </div>
    );
  }

  // Form steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
                style={{
                  width: `${
                    (["tutor", "petType", "petInfo", "health", "behavior", "routine", "notifications"].indexOf(currentStep) + 1) * 14.28
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Tutor Info */}
          {currentStep === "tutor" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-black">Sobre Você</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="tutorName" className="text-black font-semibold mb-2 block">Como você gostaria de ser chamado(a)?</Label>
                  <Input
                    id="tutorName"
                    placeholder="Seu nome"
                    value={formData.tutorName}
                    onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })}
                    className="rounded-xl border-gray-300 text-black placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Qual seu nível de experiência com pets?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Iniciante", "Intermediário", "Experiente"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData({ ...formData, experienceLevel: level })}
                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                          formData.experienceLevel === level
                            ? "border-blue-400 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pet Type */}
          {currentStep === "petType" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Dog className="w-6 h-6 text-pink-500" />
                </div>
                <h2 className="text-2xl font-bold text-black">Tipo de Pet</h2>
              </div>

              <div>
                <Label className="text-black font-semibold mb-3 block">Qual é o tipo do seu pet?</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: "Cachorro", emoji: "🐕" },
                    { value: "Gato", emoji: "🐱" },
                    { value: "Outro", emoji: "🐰" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setFormData({ ...formData, petType: type.value })}
                      className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.petType === type.value
                          ? "border-pink-400 bg-pink-50 text-pink-700"
                          : "border-gray-200 hover:border-gray-300 text-black"
                      }`}
                    >
                      <span className="text-4xl">{type.emoji}</span>
                      <span className="font-medium">{type.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pet Info */}
          {currentStep === "petInfo" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Camera className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-black">Identificação do Pet</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="petName" className="text-black font-semibold mb-2 block">Nome do pet</Label>
                  <Input
                    id="petName"
                    placeholder="Ex: Max, Luna, Bob..."
                    value={formData.petName}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    className="rounded-xl border-gray-300 text-black placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="breed" className="text-black font-semibold mb-2 block">Raça</Label>
                  <Input
                    id="breed"
                    placeholder="Ex: Labrador, Persa, SRD..."
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className="rounded-xl border-gray-300 text-black placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Idade</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Filhote", "Adulto", "Idoso"].map((age) => (
                      <button
                        key={age}
                        onClick={() => setFormData({ ...formData, ageGroup: age })}
                        className={`p-3 rounded-xl border-2 transition-all font-medium ${
                          formData.ageGroup === age
                            ? "border-purple-400 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="weight" className="text-black font-semibold mb-2 block">Peso atual (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 12.5"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="rounded-xl border-gray-300 text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Health */}
          {currentStep === "health" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <Stethoscope className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-black">Saúde Básica</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-black font-semibold mb-3 block">Seu pet possui alguma condição de saúde conhecida?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Sim", "Não"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData({ ...formData, hasHealthCondition: option })}
                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                          formData.hasHealthCondition === option
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {formData.hasHealthCondition === "Sim" && (
                    <Textarea
                      placeholder="Descreva a condição de saúde..."
                      value={formData.healthConditionDetails}
                      onChange={(e) => setFormData({ ...formData, healthConditionDetails: e.target.value })}
                      className="mt-3 rounded-xl border-gray-300 text-black placeholder:text-gray-400"
                      rows={3}
                    />
                  )}
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Seu pet está com vacinas em dia?</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Sim", "Não", "Não sei"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData({ ...formData, vaccinesUpToDate: option })}
                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                          formData.vaccinesUpToDate === option
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Ele toma medicação regularmente?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Sim", "Não"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData({ ...formData, takesMedication: option })}
                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                          formData.takesMedication === option
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Behavior */}
          {currentStep === "behavior" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <Brain className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-black">Comportamento e Personalidade</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-black font-semibold mb-3 block">Como você descreveria o comportamento do seu pet?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Calmo", "Energético", "Ansioso", "Medroso", "Agressivo ocasional", "Normal / equilibrado"].map((behavior) => (
                      <button
                        key={behavior}
                        onClick={() => toggleArrayValue("behaviorType", behavior)}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          formData.behaviorType.includes(behavior)
                            ? "border-green-400 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {behavior}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Seu pet tem algum problema atual que você gostaria de melhorar?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Xixi fora do lugar",
                      "Ansiedade de separação",
                      "Latidos/miados excessivos",
                      "Destruição de objetos",
                      "Medo de pessoas",
                      "Puxa muito no passeio",
                    ].map((problem) => (
                      <button
                        key={problem}
                        onClick={() => toggleArrayValue("behaviorProblems", problem)}
                        className={`p-3 rounded-xl border-2 transition-all text-sm text-left font-medium ${
                          formData.behaviorProblems.includes(problem)
                            ? "border-green-400 bg-green-50 text-green-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {problem}
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Outros problemas..."
                    value={formData.behaviorProblemsOther}
                    onChange={(e) => setFormData({ ...formData, behaviorProblemsOther: e.target.value })}
                    className="mt-3 rounded-xl border-gray-300 text-black placeholder:text-gray-400"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Routine */}
          {currentStep === "routine" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Home className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-black">Rotina do Pet</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-black font-semibold mb-3 block">Com que frequência seu pet passeia?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["1x ao dia", "2x ao dia", "3x ou mais", "Não passeia"].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setFormData({ ...formData, walkFrequency: freq })}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          formData.walkFrequency === freq
                            ? "border-orange-400 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Qual a alimentação dele?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Ração", "Natural", "Mista", "Não tenho certeza"].map((food) => (
                      <button
                        key={food}
                        onClick={() => setFormData({ ...formData, foodType: food })}
                        className={`p-3 rounded-xl border-2 transition-all font-medium ${
                          formData.foodType === food
                            ? "border-orange-400 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {food}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Quais horários ele costuma se alimentar?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Manhã", "Tarde", "Noite", "Livre demanda"].map((time) => (
                      <button
                        key={time}
                        onClick={() => toggleArrayValue("feedingTimes", time)}
                        className={`p-3 rounded-xl border-2 transition-all font-medium ${
                          formData.feedingTimes.includes(time)
                            ? "border-orange-400 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {currentStep === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Bell className="w-6 h-6 text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-black">Lembretes e Notificações</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-black font-semibold mb-3 block">Você gostaria de receber lembretes sobre cuidados?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Sim, todos", "Sim, somente essenciais", "Apenas saúde", "Não quero lembretes"].map((pref) => (
                      <button
                        key={pref}
                        onClick={() => setFormData({ ...formData, reminderPreference: pref })}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          formData.reminderPreference === pref
                            ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-black font-semibold mb-3 block">Quais cuidados você quer acompanhar?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Vacinas", "Vermífugo", "Antipulgas", "Banho e tosa", "Passeios", "Medicação", "Peso", "Exercícios"].map((care) => (
                      <button
                        key={care}
                        onClick={() => toggleArrayValue("careTracking", care)}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          formData.careTracking.includes(care)
                            ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300 text-black"
                        }`}
                      >
                        {care}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep !== "tutor" && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 rounded-xl py-6 border-2"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl py-6"
            >
              {currentStep === "notifications" ? "Finalizar" : "Próximo"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Skip button */}
          <div className="text-center mt-4">
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              Pular configuração
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
