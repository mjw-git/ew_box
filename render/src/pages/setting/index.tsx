import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { clearPassword } from '@/services/password'
import { clearCompressTask } from '@/services/sharp'
import { exportData, importData } from '@/services/system'
import { useRequest } from 'ahooks'

const Setting = () => {
  const { toast } = useToast()
  const { run: clearRun } = useRequest(clearCompressTask, {
    manual: true,
    onSuccess: () => {
      toast({
        description: 'Clear Success',
      })
    },
  })
  const { run: clearPwdRun } = useRequest(clearPassword, {
    manual: true,
    onSuccess: () => {
      toast({
        description: 'Clear Success',
      })
    },
  })
  const { run: importRun } = useRequest(importData, {
    manual: true,
    onSuccess: () => {
      toast({
        description: 'Import Success',
      })
    },
  })
  return (
    <div>
      <h1 className='text-black font-bold text-[32px] mb-3'>Setting</h1>
      <div className='flex flex-wrap gap-2'>
        <Card className='w-[350px]'>
          <CardHeader className='p-2'>
            <CardTitle>Compress</CardTitle>
            <CardDescription>Clear your all compressed img folder</CardDescription>
          </CardHeader>
          <CardFooter className='flex justify-end p-2'>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>Confirm</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='p-6'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you confirmed?</AlertDialogTitle>
                  <AlertDialogDescription>You will delete all your compressed file. It will be not restore</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      clearRun()
                    }}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
        <Card className='w-[350px]'>
          <CardHeader className='p-2'>
            <CardTitle>Password</CardTitle>
            <CardDescription>clear your all saved password</CardDescription>
          </CardHeader>
          <CardFooter className='flex justify-end p-2'>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>Confirm</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='p-6'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you confirmed?</AlertDialogTitle>
                  <AlertDialogDescription>You will delete all saved password. It will be not restore</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      clearPwdRun()
                    }}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
      <div className='flex gap-3 mt-2'>
        <Button
          onClick={async () => {
            await window.systemApi.openPath('processResource')
          }}>
          Open Resource Dir
        </Button>
        <Button
          variant='outline'
          onClick={async () => {
            await window.systemApi.openPath('appPath')
          }}>
          Open UserData Dir
        </Button>
        <Button
          variant='outline'
          onClick={async () => {
            await exportData()
          }}>
          Export All Data
        </Button>
        <Button
          onClick={async () => {
            const result = await window.systemApi.openFileDialog({
              properties: ['openFile'],
              title: 'Upload',
              buttonLabel: 'Upload',
              filters: [{ name: 'data', extensions: ['xlsx'] }],
            })
            if (result.length > 0) {
              importRun({ filename: result[0] })
            }
            // console.log(result)
          }}>
          Import Data
        </Button>
      </div>
    </div>
  )
}
export default Setting
