import React, { useState, useEffect, useRef, useContext, } from 'react';
import { 
  Container, 
  Input, 
  Button, 
  ButtonText, 
  HeaderTitle, 
  InfoText, 
  Loading, 
  ErrorMessage,
  TabContainer,
  TabButton,
  TabText,
  InputContainer,
  InputCheckContainer,
  InputCheckText,
  ActionInfoContainer
} from '../styles';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../../../contexts/auth'
import { useDebouncedCallback } from 'use-debounce'

const Password: React.FC = () => {
  const refPassword = useRef(null)
  const refPasswordConfirm = useRef(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [loadingPasswordConfirm, setLoadingPasswordConfirm] = useState(false)
  const [errorPassword, setErrorPassword] = useState<string | null>(null)
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string | null>(null)
  const [steps, setSteps] = useState('password')
  const route = useRoute()
  const { username, phone } = route.params as any
  const { signed, signIn, signUp, loading, error } = useContext(AuthContext)
  const [sucess, setSucess] = useState<any>({ password: false, passwordConfirm: false })
  const [debouncedCallbackPassword] = useDebouncedCallback(checkPassowrd, 1000)
  const [changeInput, setChangeInput] = useState<boolean>(false);

  useEffect(() => {
      targetInput(refPassword)
  }, [])

  useEffect(() => {
    switch (steps) {
      case 'password':
        targetInput(refPassword)
        break;
      case 'passwordConfirm':
        targetInput(refPasswordConfirm)
        break;
      default:
        break;
    }
  }, [steps])

  function targetInput(ref) {
    if (ref.current) {
      ref.current?.blur()
      setTimeout(() => {
        ref.current?.focus()
      }, 100);
    }
  }

  function checkPassowrd(password: string, done: any, start: any) {
    start()
    if (password.length >= 6) return done(true)
    return done(false)
  }

  function handleChangePassword (keyboarText: string) {
    setChangeInput(true)
    setPassword(keyboarText)
    debouncedCallbackPassword(keyboarText, 
      response => setSucess({ ...sucess, password: response }),
      () => setChangeInput(false)
    )
    if (!keyboarText) return setSucess({ ...sucess, password: false })
  }

  function handleChangePasswordConfirm (keyboarText: string) {
    setChangeInput(true)
    setPasswordConfirm(keyboarText)
    debouncedCallbackPassword(keyboarText, 
      response => setSucess({ ...sucess, passwordConfirm: response }),
      () => setChangeInput(false)
    )
    if (!keyboarText) return setSucess({ ...sucess, passwordConfirm: false })
  }

  async function nextStep () {
    if (password === passwordConfirm) {
      await signUp(username, phone, password)
    } else {
      setErrorPassword('Os campos de senhas não são iguais')
      setErrorPasswordConfirm('Os campos de senhas não são iguais')
    }
  }

  return (
    <Container>
      {error?.network && <ActionInfoContainer><InfoText>{error?.network}</InfoText></ActionInfoContainer> }
      {steps === 'password' && <HeaderTitle>Escolha uma senha segura</HeaderTitle>}
      {steps === 'passwordConfirm' && <HeaderTitle>Confirme a sua senha de usuário</HeaderTitle>}
      <TabContainer>
        <TabButton
          stepName={'password'}
          steps={steps}
          onPress={() => setSteps('password')}
        ><TabText>SENHA</TabText>
        </TabButton>
        <TabButton
          stepName={'passwordConfirm'}
          steps={steps}
          onPress={() => setSteps('passwordConfirm')}
        ><TabText>CONFIRMAR</TabText>
        </TabButton>
      </TabContainer>
      {steps === 'password' && 
      <>
        <InputContainer>
        <Input
            ref={refPassword}
            error={!sucess.password && password && !changeInput && !loading}
            sucesss={sucess.password && !changeInput && !loading}
            placeholder={'Digite a sua senha...'}
            value={password}
            onChangeText  ={handleChangePassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          <InputCheckContainer>
            { password && !loading && !changeInput ?
                 sucess.password
                  ? <InputCheckText>OK</InputCheckText> 
                  : <InputCheckText>X</InputCheckText> 
              : null}
          </InputCheckContainer>
        </InputContainer>
      </>}
      {steps === 'passwordConfirm' && 
      <>
        <InputContainer>
          <Input
            ref={refPasswordConfirm}
            error={!(password === passwordConfirm) && passwordConfirm && !changeInput && !loading}
            sucesss={(password === passwordConfirm) && !changeInput && !loading}
            placeholder={'Digite a sua senha novamente...'}
            value={passwordConfirm}
            onChangeText={handleChangePasswordConfirm}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType='go'
            secureTextEntry
          />
          <InputCheckContainer>
            { passwordConfirm && !loading && !changeInput ?
                 (password === passwordConfirm)
                  ? <InputCheckText>OK</InputCheckText> 
                  : <InputCheckText>X</InputCheckText> 
              : null}
          </InputCheckContainer>
        </InputContainer>
      </>}
      <Button disabled={!(password === passwordConfirm)} onPress={() => nextStep()}>
        {loading ? <Loading color="white" /> : <ButtonText>Avançar</ButtonText>}
      </Button>
      {
          (steps === 'password') ? 
            !errorPassword ? <InfoText>É permitido que haja no minimo 6 de tamanho na sua senha </InfoText> 
            : errorPassword && <ErrorMessage>{errorPassword}</ErrorMessage>
          : (steps === 'passwordConfirm')  && 
          !errorPasswordConfirm ? <InfoText>Sugerimos o uso de numeros e carcteres especiais</InfoText>
          : errorPasswordConfirm && <ErrorMessage>{errorPasswordConfirm}</ErrorMessage>
      }

    </Container>
  )
}

export default Password