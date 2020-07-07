import React, { useState, useEffect, useRef, useContext, } from 'react';
import { useDebouncedCallback } from 'use-debounce';
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
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../contexts/auth';

const User: React.FC = () => {
  const refUsername = useRef(null)
  const refPhone = useRef(null)
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const { checkUsername, checkPhoneFake, loading, error } = useContext(AuthContext)
  const [debouncedCallbackUsername] = useDebouncedCallback(checkUsername, 1000)
  const [debouncedCallbackPhone] = useDebouncedCallback(checkPhoneFake, 1000)
  const [steps, setSteps] = useState('username')
  const navigation = useNavigation()
  const [changeInput, setChangeInput] = useState<boolean>(false);
  const [sucess, setSucess] = useState<any>({ username: false, phone: false })

  useEffect(() => {
      targetInput(refUsername)
  }, [])

  useEffect(() => {
    switch (steps) {
      case 'username':
        targetInput(refUsername)
        break;
      case 'phone':
        targetInput(refPhone)
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

  async function handleChangeUsername (keyboarText: string) {
    setChangeInput(true)
    debouncedCallbackUsername(keyboarText,
      response => setSucess({ ...sucess, username: response }),
      () => setChangeInput(false)
    )
    setUsername(keyboarText)
    if (!keyboarText) setSucess({ ...sucess, username: false })
  }

  async function handleChangePhone (keyboarText: string) {
    setChangeInput(true)
    debouncedCallbackPhone(keyboarText, 
      response => setSucess({ ...sucess, phone: response }),
      () => setChangeInput(false)
    )
    setPhone(keyboarText)
    if (!keyboarText) setSucess({ ...sucess, phone: false })
  }

  function nextStep () {
    navigation.navigate('Password', { username, phone })
  }

  return (
    <Container>
      { error?.network && <ActionInfoContainer><InfoText color="red">{error?.network}</InfoText></ActionInfoContainer> }
      {steps === 'username' && <HeaderTitle>Escolha nome de usuário</HeaderTitle>}
      {steps === 'phone' && <HeaderTitle>Adicione o seu telefone</HeaderTitle>}
      <TabContainer>
        <TabButton
          stepName={'username'}
          steps={steps}
          onPress={() => setSteps('username')}
        ><TabText>USUÁRIO</TabText>
        </TabButton>
        <TabButton
          stepName={'phone'}
          steps={steps}
          onPress={() => setSteps('phone')}
        ><TabText>TELEFONE</TabText>
        </TabButton>
      </TabContainer>
      {steps === 'username' && 
      <>
        <InputContainer>
        <Input
            ref={refUsername}
            error={!sucess.username && username && !changeInput && !loading}
            sucesss={sucess.username && !changeInput && !loading}
            placeholder={'Digite um nome de usuario...'}
            value={username}
            onChangeText  ={handleChangeUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <InputCheckContainer>
            { username && !loading && !changeInput ?
                 sucess.username
                  ? <InputCheckText>OK</InputCheckText> 
                  : <InputCheckText>X</InputCheckText> 
              : null}
          </InputCheckContainer>
        </InputContainer>
      </>}
      {steps === 'phone' && 
      <>
        <InputContainer>
          <Input
            ref={refPhone}
            error={!sucess.phone && phone && !changeInput && !loading}
            sucesss={sucess.phone && !changeInput && !loading}
            placeholder={'Digite o seu numero de telefone...'}
            value={phone}
            onChangeText={handleChangePhone}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType='go'
            keyboardType={'phone-pad'}
          />
          <InputCheckContainer>
            { phone && !loading && !changeInput ?
                 sucess.phone
                  ? <InputCheckText>OK</InputCheckText> 
                  : <InputCheckText>X</InputCheckText> 
              : null}
          </InputCheckContainer>
        </InputContainer>
      </>}
      <Button disabled={!sucess.username || !sucess.phone} onPress={nextStep}>
        {loading ? <Loading color="white" /> : <ButtonText>Avançar</ButtonText>}
      </Button>
      {error?.default && !changeInput
          ? <InfoText color="red">{error?.default}</InfoText>
          : (steps === 'username') 
            ? <InfoText>Você poderá altera-lo depois.</InfoText>
            : (steps === 'phone')
            ? <InfoText>Você poderá receber atualizações por SMS do Wasit e pode cancelar o recebimento a qualquer momento.</InfoText>
            : null
      }

    </Container>
  )
}

export default User