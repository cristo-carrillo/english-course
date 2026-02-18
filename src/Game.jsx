import { useState, useEffect, useMemo } from 'react'
import { Flashcard } from './components/Flashcard'
import { Button } from './components/Button'
import { StatsBar } from './components/StatsBar'
import { Header } from './components/Header'
import { useLocalStorage } from './hooks/useLocalStorage'
import { VOCABULARY } from './data/vocabulary'

const STORAGE_KEY = 'english_course_learned_terms'

export default function Game() {
  const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learned, setLearned] = useLocalStorage(STORAGE_KEY, [])
  const [hideLearned, setHideLearned] = useState(false)

  // Convertir array a Set para búsquedas rápidas
  const learnedSet = useMemo(() => new Set(learned), [learned])

  useEffect(() => {
    initializeCards()
  }, [])

  const initializeCards = () => {
    const shuffled = [...VOCABULARY].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  // Filtrar tarjetas si opción "ocultar aprendidas" está activa
  const visibleCards = useMemo(() => {
    if (!hideLearned) return cards
    return cards.filter(card => !learnedSet.has(card.term))
  }, [cards, hideLearned, learnedSet])

  const handleMarkKnown = () => {
    const currentCard = visibleCards[currentIndex]
    if (!currentCard) return
    setLearned(prev => {
      const next = Array.from(new Set([...prev, currentCard.term]))
      return next
    })
    setIsFlipped(false)
    // Auto-advance to next card after marking
    setTimeout(handleNextCard, 200)
  }

  const handleNextCard = () => {
    setIsFlipped(false)
    if (visibleCards.length === 0) return
    setCurrentIndex(prev => (prev + 1) % visibleCards.length)
  }

  const handleReset = () => {
    setLearned([])
    initializeCards()
  }

  // Loading state
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-400">
        <p>Loading vocabulary...</p>
      </div>
    )
  }

  // Completion state when all words are learned or hidden
  if (visibleCards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-black text-emerald-400 mb-4">Congratulations!</h2>
          <p className="text-slate-400 mb-8">You've learned all the words 🎉</p>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={() => setHideLearned(false)}>
              Show all
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Restart
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const current = visibleCards[currentIndex] ?? visibleCards[0]
  const totalCards = cards.length
  const learnedCount = learned.length

  // Safety check to prevent undefined current card
  if (!current) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-400">
        <p>Error loading card. Please refresh the page.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-white">
      <Header />

      {/* Flashcard */}
      <div className="max-w-md w-full mb-8">
        <Flashcard
          term={current.term}
          definition={current.def}
          category={current.cat}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
        />
      </div>

      {/* Main Buttons */}
      <div className="w-full max-w-md flex flex-col gap-3 mb-6">
        <Button
          variant="primary"
          size="lg"
          onClick={handleMarkKnown}
          className="w-full flex items-center justify-center gap-2"
        >
          ✓ GOT IT
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={handleNextCard}
          className="w-full"
        >
          NEXT
        </Button>
      </div>
      <StatsBar
        learned={learnedCount}
        total={totalCards}
        hideLearned={hideLearned}
        onToggleHide={setHideLearned}
      />
    </div>
  )
}
