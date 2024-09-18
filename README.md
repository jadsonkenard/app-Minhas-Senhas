#criar alerta de senha copiada
#criar confirmação de deletar senha  
  
  
  
  const handleRemoveTask = (id: string) => {
    Alert.alert(
      `Deletar tarefa?`,
      `Delesa realmente deletar a tarefa ${id} ?`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Deletar',
          onPress: () => removeTask(id),
        },
      ],
    );
  };