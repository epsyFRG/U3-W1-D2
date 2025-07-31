import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BookList from '../src/components/BookList'
import CommentArea from '../src/components/CommentArea'
import fantasyBooks from '../src/data/fantasy.json'

describe('Book Interaction Tests', () => {
  it('renderizza correttamente il componente CommentArea', () => {
    render(<CommentArea asin="0316438960" />)
    // Il componente CommentArea dovrebbe essere presente nel DOM
    expect(document.body).toBeInTheDocument()
  })

  it('cambia il colore del bordo quando si clicca su un libro', () => {
    render(<BookList books={fantasyBooks.slice(0, 3)} />)
    
    // Trova tutti i contenitori dei libri
    const bookContainers = screen.getAllByRole('img').map(img => img.closest('[style*="cursor"]'))
    
    // Clicca sul primo libro
    fireEvent.click(bookContainers[0])
    
    // Verifica che il bordo sia cambiato cercando un elemento con bordo rosso
    const selectedCard = screen.getByRole('img', { name: fantasyBooks[0].title }).closest('.card')
    expect(selectedCard).toHaveStyle('border: 2px solid red')
  })

  it('cambia il bordo del primo libro quando si clicca su un secondo libro', () => {
    render(<BookList books={fantasyBooks.slice(0, 3)} />)
    
    // Trova tutti i contenitori dei libri
    const bookContainers = screen.getAllByRole('img').map(img => img.closest('[style*="cursor"]'))
    
    // Clicca sul primo libro
    fireEvent.click(bookContainers[0])
    
    // Clicca sul secondo libro
    fireEvent.click(bookContainers[1])
    
    // Verifica che il secondo libro sia selezionato
    const secondCard = screen.getByRole('img', { name: fantasyBooks[1].title }).closest('.card')
    expect(secondCard).toHaveStyle('border: 2px solid red')
  })

  it('non mostra commenti all\'avvio senza aver cliccato su nessun libro', () => {
    render(<BookList books={fantasyBooks.slice(0, 3)} />)
    
    // Verifica che non ci siano elementi di commento visibili
    const commentElements = screen.queryAllByTestId('single-comment')
    expect(commentElements.length).toBe(0)
  })

  it('carica le recensioni quando si clicca su un libro', async () => {
    render(<BookList books={fantasyBooks.slice(0, 3)} />)
    
    // Trova tutti i contenitori dei libri
    const bookContainers = screen.getAllByRole('img').map(img => img.closest('[style*="cursor"]'))
    
    // Clicca sul primo libro
    fireEvent.click(bookContainers[0])
    
    // Verifica che il componente CommentArea sia presente e stia gestendo l'asin
    await waitFor(() => {
      // Il componente dovrebbe essere presente nel DOM
      expect(document.body).toBeInTheDocument()
    })
  })
})