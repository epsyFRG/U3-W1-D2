import { render, screen, fireEvent } from '@testing-library/react'
import BookList from '../src/components/BookList'
import fantasyBooks from '../src/data/fantasy.json'

describe('BookList Component', () => {
  it('renderizza tante bootstrap cards quanti sono i libri nel file json', () => {
    render(<BookList books={fantasyBooks} />)
    const cards = screen.getAllByRole('img')
    expect(cards.length).toBe(fantasyBooks.length)
  })

  it('filtra correttamente i libri quando si cerca nel campo di ricerca', () => {
    render(<BookList books={fantasyBooks} />)
    const searchField = screen.getByPlaceholderText('Cerca per titolo...')
    
    // Conta tutte le card prima del filtraggio
    const initialCards = screen.getAllByRole('img')
    
    // Filtra per un termine specifico
    fireEvent.change(searchField, { target: { value: 'Witcher' } })
    
    // Verifica che il numero di card sia diminuito
    const filteredCards = screen.getAllByRole('img')
    expect(filteredCards.length).toBeLessThan(initialCards.length)
    
    // Verifica che le card filtrate contengano il termine cercato
    const bookTitles = screen.getAllByText(/Witcher/i)
    expect(bookTitles.length).toBeGreaterThan(0)
  })

  it('cancella il filtro quando si svuota il campo di ricerca', () => {
    render(<BookList books={fantasyBooks} />)
    const searchField = screen.getByPlaceholderText('Cerca per titolo...')
    
    // Filtra per un termine specifico
    fireEvent.change(searchField, { target: { value: 'Witcher' } })
    
    // Cancella il filtro
    fireEvent.change(searchField, { target: { value: '' } })
    
    // Verifica che tutte le card siano nuovamente visibili
    const cards = screen.getAllByRole('img')
    expect(cards.length).toBe(fantasyBooks.length)
  })
})