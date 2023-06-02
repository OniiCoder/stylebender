import ColorPicker from './ColorPicker'
import Section from './Section'
import styles from './ColorSection.module.css'
import Button from './Button'
import Shades from './Shades'
import useStyleConfig from '../hooks/use-style-config'

type ColorTypes = 'primary' | 'secondary' | 'tertiary'

function Preview() {
  const [style, setStyle] = useStyleConfig()

  function handleColorSelect(which: ColorTypes, value: string) {
    setStyle((style) => ({
      ...style,
      colors: { ...style.colors, [which]: value },
    }))
  }

  function handleShadesUpdate(which: ColorTypes, value: string[]) {
    const key = `${which}Shades`
    setStyle((style) => ({
      ...style,
      colors: { ...style.colors, [key]: value },
    }))
  }

  const { primary, secondary, tertiary } = style.colors

  return (
    <div className={styles.preview}>
      <div className={styles.shadeIndices}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>{(index + 1) * 100}</div>
        ))}
      </div>

      <div className={styles.baseColor}>
        <div>
          <header>Primary</header>
          <ColorPicker
            value={primary}
            onChange={(value) => handleColorSelect('primary', value)}
          />
        </div>

        <Shades
          className={styles.shades}
          color={primary}
          inform={(shades) => handleShadesUpdate('primary', shades)}
        />
      </div>

      <div className={styles.baseColor}>
        <div>
          <header>Secondary</header>
          <ColorPicker
            value={secondary}
            onChange={(value) => handleColorSelect('secondary', value)}
          />
        </div>

        <Shades
          className={styles.shades}
          color={secondary}
          inform={(shades) => handleShadesUpdate('secondary', shades)}
        />
      </div>

      <div className={styles.baseColor}>
        <div>
          <header>Tertiary</header>
          <ColorPicker
            value={tertiary}
            onChange={(value) => handleColorSelect('tertiary', value)}
          />
        </div>

        <Shades
          className={styles.shades}
          color={tertiary}
          inform={(shades) => handleShadesUpdate('tertiary', shades)}
        />
      </div>
    </div>
  )
}

function ColorSection() {
  return (
    <Section
      config={
        <Button className="plain">
          <span className="material-symbols-outlined me-1">shuffle</span>{' '}
          Randomize
        </Button>
      }
      id="colors"
      name={
        <>
          <span className="material-symbols-outlined me-1">palette</span>
          Colors
        </>
      }
    >
      <Preview />
    </Section>
  )
}

export default ColorSection