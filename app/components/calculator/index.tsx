import { refineExp } from '@/app/utils/refineExp'
import {
  IconBackspace,
  IconCalculator,
  IconDivide,
  IconEqual,
  IconMinus,
  IconPlus,
  IconPlusMinus,
  IconX,
} from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { VscPercentage } from 'react-icons/vsc'
import { CalcButton } from './calc-button'

type CalculatorMode = 'typing' | 'result'
type OperatorType = '+' | '-' | '×' | '÷'

interface CalculatorState {
  history: string
  expression: string
  mode: CalculatorMode
}

const OPERATORS: OperatorType[] = ['+', '-', '×', '÷']

export function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    history: '',
    expression: '',
    mode: 'result',
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const { history, expression, mode } = state
  const execute = refineExp(expression)

  const updateState = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const handlePress = (value: string) => {
    updateState({
      mode: 'typing',
      expression: expression + value,
    })
  }

  const handleOperatorPress = (operator: OperatorType) => {
    if (!expression) {
      if (operator === '-') handlePress(operator)
      return
    }

    const lastChar = expression[expression.length - 1]
    if (!OPERATORS.includes(lastChar as OperatorType)) {
      handlePress(operator)
    } else if (operator === '-' && lastChar !== '-') {
      handlePress(operator)
    }
  }

  const handleDecimalPress = () => {
    if (!expression) {
      handlePress('0.')
      return
    }

    const lastChar = expression[expression.length - 1]
    if (lastChar === '.') return

    if (OPERATORS.includes(lastChar as OperatorType)) {
      handlePress('0.')
    } else {
      handlePress('.')
    }
  }

  const handleNumberPress = (num: string) => {
    if (num === '0' && !expression) return
    handlePress(num)
  }

  const handleClear = () => {
    updateState({
      history: '',
      expression: '',
      mode: 'result',
    })
  }

  const handleBackspace = () => {
    if (expression.length >= 1) {
      updateState({
        expression: expression.slice(0, -1),
        mode: 'typing',
      })
    }
  }

  const handlePlusMinus = () => {
    if (expression && !Number.isNaN(Number(expression))) {
      updateState({
        expression: (-1 * Number(expression)).toString(),
        mode: 'typing',
      })
    }
  }

  const handleCalculate = () => {
    if (!execute) return

    try {
      const result = eval(execute)
      updateState({
        expression: result.toString(),
        history: expression,
        mode: 'result',
      })
    } catch (error) {
      console.error('Calculation error:', error)
      // Could add error handling UI here
    }
  }

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.scrollLeft =
      mode === 'typing' ? inputRef.current.scrollWidth : 0
  }, [expression, mode])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <input
          value={history}
          readOnly
          className="h-8 w-[220px] cursor-default overflow-y-hidden bg-transparent text-right text-2xl text-gray-400 focus:outline-none"
          aria-label="Calculation history"
        />
        <input
          ref={inputRef}
          value={expression || '0'}
          readOnly
          className="w-[220px] cursor-default bg-transparent text-right text-4xl focus:outline-none"
          aria-label="Current calculation"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {mode === 'typing' ? (
          <CalcButton onPress={handleBackspace} aria-label="Backspace">
            <IconBackspace stroke={2} />
          </CalcButton>
        ) : (
          <CalcButton onPress={handleClear} label="AC" aria-label="Clear all" />
        )}

        <CalcButton onPress={handlePlusMinus} aria-label="Plus/minus">
          <IconPlusMinus stroke={2} />
        </CalcButton>

        <CalcButton aria-label="Percentage">
          <VscPercentage className="text-2xl" />
        </CalcButton>

        <CalcButton
          onPress={() => handleOperatorPress('÷')}
          isHighlight
          aria-label="Divide"
        >
          <IconDivide stroke={2} />
        </CalcButton>

        {/* Number pad */}
        {[7, 8, 9].map((num) => (
          <CalcButton
            key={num}
            onPress={() => handleNumberPress(num.toString())}
            label={num.toString()}
            aria-label={num.toString()}
          />
        ))}

        <CalcButton
          onPress={() => handleOperatorPress('×')}
          isHighlight
          aria-label="Multiply"
        >
          <IconX stroke={2} />
        </CalcButton>

        {[4, 5, 6].map((num) => (
          <CalcButton
            key={num}
            onPress={() => handleNumberPress(num.toString())}
            label={num.toString()}
            aria-label={num.toString()}
          />
        ))}

        <CalcButton
          onPress={() => handleOperatorPress('-')}
          isHighlight
          aria-label="Subtract"
        >
          <IconMinus stroke={2} />
        </CalcButton>

        {[1, 2, 3].map((num) => (
          <CalcButton
            key={num}
            onPress={() => handleNumberPress(num.toString())}
            label={num.toString()}
            aria-label={num.toString()}
          />
        ))}

        <CalcButton
          onPress={() => handleOperatorPress('+')}
          isHighlight
          aria-label="Add"
        >
          <IconPlus stroke={2} />
        </CalcButton>

        <CalcButton aria-label="Calculator mode">
          <IconCalculator stroke={2} />
        </CalcButton>

        <CalcButton
          onPress={() => handleNumberPress('0')}
          label="0"
          aria-label="Zero"
        />

        <CalcButton
          onPress={handleDecimalPress}
          label="."
          aria-label="Decimal point"
        />

        <CalcButton
          onPress={handleCalculate}
          isHighlight
          aria-label="Calculate"
        >
          <IconEqual stroke={2} />
        </CalcButton>
      </div>
    </div>
  )
}
