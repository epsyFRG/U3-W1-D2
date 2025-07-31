import { render, screen } from '@testing-library/react'
import Welcome from '../src/components/Welcome'

describe('Welcome Component', () => {
  it('monta correttamente il componente Welcome', () => {
    render(<Welcome />)
    const welcomeElement = screen.getByText(/Benvenuto nel mio shop!/i)
    expect(welcomeElement).toBeInTheDocument()
  })
})