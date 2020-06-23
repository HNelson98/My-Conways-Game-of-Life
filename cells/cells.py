class Cell:
    def __init__(self):

        self._status = 'Dead'

    def set_dead(self):

        self._status = 'Dead'
    
    def set_alive(self):

        self._status = 'Alive'

    def is_alive(self): 

        if self._status == 'Alive':
            return True
        return False
    
    def get_charachter(self):

        if self.is_alive():
            return '0'
        return '*'

